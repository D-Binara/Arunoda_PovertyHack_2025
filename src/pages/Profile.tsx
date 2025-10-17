import { useState } from 'react';
import { Edit, LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { mockProfile } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  const handleClearCache = () => {
    if (confirm('Clear all offline data? This cannot be undone.')) {
      toast.success('Cache cleared successfully');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account and settings</p>
        </div>

        {/* Profile Card */}
        <Card className="card-elevated">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <img 
                src={mockProfile.photo} 
                alt={mockProfile.name}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{mockProfile.name}</h2>
                <p className="text-muted-foreground">{mockProfile.role}</p>
                <p className="text-sm text-muted-foreground">
                  📍 {mockProfile.village}, {mockProfile.district}
                </p>
              </div>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            {mockProfile.bio && <p className="text-sm">{mockProfile.bio}</p>}

            {mockProfile.skills?.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Preferences */}
        <Card className="card-elevated">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold">Contact Preferences</h3>
            <div className="space-y-3 text-sm">
              {mockProfile.contactPrefs.whatsapp && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">WhatsApp</span>
                  <span className="font-medium">{mockProfile.contactPrefs.whatsapp}</span>
                </div>
              )}
              {mockProfile.lankaQR && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">LankaQR</span>
                  <Badge variant="secondary">Set up</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="card-elevated">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold">Settings</h3>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Language</span>
              <LanguageSwitcher />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Text-to-Speech</p>
                <p className="text-xs text-muted-foreground">
                  Auto-play audio for stories
                </p>
              </div>
              <Button
                variant={ttsEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setTtsEnabled(!ttsEnabled)}
              >
                {ttsEnabled ? "On" : "Off"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Auto-Download</p>
                <p className="text-xs text-muted-foreground">
                  Download content packs on WiFi
                </p>
              </div>
              <Button
                variant={autoDownload ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoDownload(!autoDownload)}
              >
                {autoDownload ? "On" : "Off"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleClearCache}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Offline Cache
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Version Info */}
        <div className="text-center text-xs text-muted-foreground">
          <p>EmpowerLearn Stories v1.0.0</p>
          <p>Made with ❤️ for rural communities</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
