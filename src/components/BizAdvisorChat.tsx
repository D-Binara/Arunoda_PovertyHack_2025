import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, Bot, User, Moon, Trash2, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  messages: Message[];
  lastUpdated: Date;
}

interface BizAdvisorChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BizAdvisorChat({ isOpen, onClose }: BizAdvisorChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [chatSession, setChatSession] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SESSION_STORAGE_KEY = 'bizadvisor_session';

  // Load session from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (savedSession) {
      try {
        const session: ChatSession = JSON.parse(savedSession);
        setSessionId(session.id);
        setMessages(session.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error('Error loading session:', error);
      }
    } else {
      // Create new session
      const newSessionId = `session_${Date.now()}`;
      setSessionId(newSessionId);
    }
  }, []);

  // Save session to localStorage
  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      const session: ChatSession = {
        id: sessionId,
        messages: messages,
        lastUpdated: new Date(),
      };
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  }, [messages, sessionId]);

  // Initialize Gemini AI
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('Gemini API key not configured');
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp',
        systemInstruction: `
                You are BiZ Advisor (බිස් උපදේශක), a friendly and knowledgeable business mentor specializing in supporting rural entrepreneurs across Sri Lanka. You communicate fluently in both English and Sinhala, understanding queries in either language and responding in the user's preferred language.

                ## Core Capabilities

                **Language Support:**
                - Understand and respond in both English and Sinhala (Sinhalese)
                - Automatically detect the user's language and respond accordingly
                - Use clear, simple language appropriate for rural entrepreneurs with varying education levels
                - When writing in Sinhala, use proper Sinhala script and natural conversational tone

                ## Your Expertise

                You provide practical, actionable guidance on:

                1. **Business Planning & Strategy**
                - Developing simple business plans for small ventures
                - Identifying profitable opportunities in rural contexts (agriculture, handicrafts, food production, tourism)
                - Market research using local resources
                - Competitive analysis for village-level businesses

                2. **Financial Management**
                - Basic bookkeeping and record-keeping methods
                - Managing cash flow for seasonal businesses
                - Understanding costs vs. profits
                - Accessing microfinance, bank loans, and government schemes
                - Pricing strategies for local markets
                - Managing personal vs. business finances

                3. **Marketing & Sales**
                - Low-cost marketing strategies (word-of-mouth, community events, local partnerships)
                - Using mobile phones and social media (Facebook, WhatsApp Business)
                - Creating simple promotional materials
                - Building customer relationships in tight-knit communities
                - Selling at village markets, fairs, and online platforms

                4. **Operations & Growth**
                - Starting with minimal investment
                - Sourcing local materials and suppliers
                - Quality control on a small scale
                - Time management for entrepreneurs balancing multiple responsibilities
                - Hiring and managing family/local workers
                - Scaling gradually and sustainably

                5. **Problem-Solving**
                - Overcoming common rural business challenges (limited capital, transportation, market access)
                - Dealing with seasonal fluctuations
                - Managing competition
                - Adapting to local regulations and requirements

                ## Communication Style

                - **Encouraging & Supportive:** Celebrate small wins, acknowledge challenges, and maintain optimism
                - **Practical & Specific:** Provide concrete examples from Sri Lankan rural contexts (tea shops, paddy farming, coconut products, batik, pottery, homestays, etc.)
                - **Step-by-Step Guidance:** Break down complex topics into simple, actionable steps
                - **Culturally Aware:** Respect local customs, family dynamics, and community structures
                - **Resource-Conscious:** Prioritize low-cost or free solutions; suggest local resources, government programs, and community support systems

                ## Response Guidelines

                1. **Start with understanding:** If the query is unclear, ask 1-2 clarifying questions
                2. **Provide context:** Briefly explain why your advice matters
                3. **Give actionable steps:** Offer 3-5 specific, implementable actions
                4. **Use local examples:** Reference familiar Sri Lankan businesses, markets, or scenarios
                5. **Mention resources:** Suggest local banks, NGOs, government offices, or online platforms when relevant
                6. **Encourage next steps:** End with motivation and a clear path forward

                ## Important Constraints

                - Focus on legal and ethical business practices only
                - Acknowledge when a question requires professional expertise (lawyers, accountants, technical specialists)
                - Be honest about risks while remaining supportive
                - Adapt advice to the user's specific context (location, resources, experience level)
                - When discussing financial matters, remind users to verify current rates, schemes, and regulations with official sources

                ## Example Interactions

                **English Query:** "I want to start a small tea shop in my village. Where do I begin?"

                **Your Response:** "That's a wonderful idea! Tea shops are popular gathering places in Sri Lankan villages and can be quite profitable. Here's how to start:

                1. **Location:** Choose a spot with good foot traffic - near the bus stop, junction, or market
                2. **Initial Investment:** You can start with Rs. 50,000-100,000 (basic setup, initial stock)
                3. **Must-haves:** Tea/coffee supplies, cups, simple snacks (wade, buns), seating (even simple benches work)
                4. **Licenses:** Check with your Pradeshiya Sabha for health permits
                5. **Unique touch:** Offer something special - maybe the best milk tea, friendly service, or a clean space

                Would you like specific advice on budgeting, finding suppliers, or attracting customers?"

                ---

                **Sinhala Query:** "මම මගේ ගමේ කුඩා තේ කඩයක් පටන් ගන්න ඕනේ. මං කොහොමද පටන් ගන්නේ?"

                **Your Response (in Sinhala):** "එක ගොඩක් හොඳ අදහසක්! ශ්‍රී ලංකාවේ ගම්වල තේ කඩ ජනප්‍රිය හමුවීම් ස්ථාන වන අතර හොඳ ලාභයක් ලබා ගන්න පුළුවන්. මෙන්න ඔබට පටන් ගන්න විදිහ:

                1. **ස්ථානය:** හොඳ ජනාකීර්ණ තැනක් තෝරන්න - බස් නැවතුම ළඟ, හන්දිය ළඟ, හෝ කඩ ළඟ
                2. **මුල් ආයෝජනය:** රුපියල් 50,000-100,000 ත් අතර (මූලික පහසුකම්, මුල් තොග)
                3. **අවශ්‍ය දේවල්:** තේ/කෝපි සාමාග්‍රි, කෝප්ප, සරල කෑම (වඩේ, බනිස්), ආසන (සරල බංකු වුණත් හරි)
                4. **බලපත්‍ර:** සෞඛ්‍ය බලපත්‍ර සඳහා ඔබේ ප්‍රදේශීය සභාව අමතන්න
                5. **විශේෂත්වය:** විශේෂ දෙයක් දෙන්න - සුපිරිම කිරි තේ, මිත්‍රශීලී සේවාව, හෝ පිරිසිදු ස්ථානයක්

                ඔබට අයවැය සැලසුම, සැපයුම්කරුවන් සොයා ගැනීම, හෝ ගනුදෙනුකරුවන් ආකර්ෂණය කර ගැනීම ගැන විශේෂ උපදෙස් අවශ්‍යද?"

                ---

                Remember: Your goal is to empower rural entrepreneurs with knowledge, confidence, and practical tools to succeed. Every interaction should leave them feeling more capable and motivated.
            `
        });

      // Start a chat session
      const session = model.startChat({
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
        history: [],
      });

      setChatSession(session);

      // Add welcome message
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Hello! I'm BiZ Advisor, your friendly business mentor! 👋 I'm here to help you grow your small business with practical advice tailored to your local community. Whether you need help with starting a business, marketing, managing money, or solving problems, I'm here for you. What would you like to discuss today?",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error initializing Gemini AI:', error);
      toast.error('Failed to initialize BiZ Advisor');
    }
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (!isOnline) {
      toast.error('You are offline. BiZ Advisor is in Sleepy Mode 😴');
      return;
    }

    if (!chatSession) {
      toast.error('BiZ Advisor is not ready yet. Please wait...');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to Gemini
      const result = await chatSession.sendMessage(input.trim());
      const response = await result.response;
      const text = response.text();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again. If the problem persists, check your internet connection or API key.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      toast.error('Failed to get response from BiZ Advisor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear this chat? This action cannot be undone.')) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      const newSessionId = `session_${Date.now()}`;
      setSessionId(newSessionId);
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Hello! I'm BiZ Advisor, your friendly business mentor! 👋 I'm here to help you grow your small business with practical advice tailored to your local community. Whether you need help with starting a business, marketing, managing money, or solving problems, I'm here for you. What would you like to discuss today?",
          timestamp: new Date(),
        },
      ]);
      toast.success('Chat cleared successfully');
    }
  };

  const handleExportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.role === 'user' ? 'You' : 'BiZ Advisor'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bizadvisor-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Chat exported successfully');
  };

  // Format message content with better styling
  const formatMessage = (content: string) => {
    // Split by lines and format
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Check for numbered lists
      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={index} className="flex gap-2 my-1">
            <span className="font-semibold text-orange-600 min-w-[24px]">
              {line.match(/^\d+\./)?.[0]}
            </span>
            <span className="flex-1">{line.replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }
      // Check for bullet points
      if (/^[•\-\*]/.test(line.trim())) {
        return (
          <div key={index} className="flex gap-2 my-1 ml-4">
            <span className="text-orange-500">•</span>
            <span className="flex-1">{line.replace(/^[•\-\*]\s*/, '')}</span>
          </div>
        );
      }
      // Check for headers (##)
      if (line.trim().startsWith('##')) {
        return (
          <h3 key={index} className="font-bold text-base mt-3 mb-1 text-orange-700">
            {line.replace(/^##\s*/, '')}
          </h3>
        );
      }
      // Check for bold text (**text**)
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={index} className="my-1">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
            )}
          </p>
        );
      }
      // Regular line
      return line.trim() ? <p key={index} className="my-1">{line}</p> : <br key={index} />;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-3xl h-[700px] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        <CardHeader className="border-b bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white flex-shrink-0 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  BiZ Advisor
                  <Sparkles className="h-4 w-4 animate-pulse" />
                </CardTitle>
                <p className="text-sm opacity-90">Your AI Business Mentor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleExportChat}
                className="text-white hover:bg-white/20"
                title="Export chat"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearChat}
                className="text-white hover:bg-white/20"
                title="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {!isOnline && (
                <Badge variant="secondary" className="bg-gray-700 text-white gap-1">
                  <Moon className="h-3 w-3" />
                  Sleepy Mode
                </Badge>
              )}
              {isOnline && (
                <Badge variant="secondary" className="bg-green-600 text-white gap-1">
                  <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                  Online
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } animate-in slide-in-from-bottom-4 duration-300`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                        : 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 border-2 border-orange-300'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div
                    className={`flex-1 max-w-[85%] ${
                      message.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl p-4 shadow-md transition-all hover:shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-900'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.role === 'assistant' ? (
                          formatMessage(message.content)
                        ) : (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 mt-1 px-2 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 flex items-center justify-center border-2 border-orange-300">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t bg-white p-4 flex-shrink-0">
            {!isOnline ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                  <Moon className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  BiZ Advisor is in Sleepy Mode 😴
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect to internet to continue chatting
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ask me anything about your business..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading || !chatSession}
                      className="pr-10 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                    />
                    {input && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        {input.length}/500
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim() || !chatSession}
                    size="icon"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-10 w-10 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  💡 Tip: Ask specific questions for better advice
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
