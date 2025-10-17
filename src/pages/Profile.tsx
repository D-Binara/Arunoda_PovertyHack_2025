import { useState } from 'react';
import { Edit, LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {mockProfile} from "@/lib/mock-data.ts";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
      toast.success('Logged out successfully');
    }
  };
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
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.role}</p>
                <p className="text-sm text-muted-foreground">
                  📍 {user?.district}
                </p>
                <p className="text-sm text-muted-foreground">
                  ✉️ {user?.email}
                </p>
              </div>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Account Status</span>
                <Badge variant={user?.isActive ? "default" : "destructive"}>
                  {user?.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">Connected to Backend ✅</span>
            {mockProfile.bio && <p className="text-sm">{mockProfile.bio}</p>}

            {mockProfile.skills?.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {mockProfile.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                </div>)
            }</div>)
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="card-elevated">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold">Account Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              {user?.role === 'admin' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Admin Dashboard
                </Button>
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
