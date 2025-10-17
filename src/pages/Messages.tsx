import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';

export default function MessagesPage() {
  // Mock thread data
  const threads = [
    { 
      id: '1', 
      name: 'Ravi Kumar', 
      lastMessage: 'Thanks for the vegetables!', 
      time: '2 hours ago',
      unread: 2,
    },
    { 
      id: '2', 
      name: 'Sunitha Silva', 
      lastMessage: 'Can you deliver tomorrow?', 
      time: '5 hours ago',
      unread: 0,
    },
    { 
      id: '3', 
      name: 'Nimal Perera', 
      lastMessage: 'Great work on the baskets!', 
      time: 'Yesterday',
      unread: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">💬 Messages</h1>
          <p className="text-muted-foreground">Connect with your community</p>
        </div>

        {/* Thread List */}
        <div className="space-y-3">
          {threads.map(thread => (
            <Card key={thread.id} className="card-elevated hover:shadow-[var(--shadow-float)] transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {thread.name[0]}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{thread.name}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {thread.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {thread.lastMessage}
                    </p>
                  </div>

                  {thread.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground rounded-full px-2">
                      {thread.unread}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {threads.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">No messages yet</p>
            <p className="text-sm">
              Start connecting with sellers and buyers!
            </p>
          </div>
        )}

        {/* Demo Chat Input */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-3">
              💡 Click a conversation to open chat
            </p>
            <div className="flex gap-2">
              <Input placeholder="Type a message..." disabled />
              <Button size="icon" disabled>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
