import { useMemo, useState } from "react";
import { Edit, LogOut, Trash2, BadgeCheck, Mail, MapPin, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockProfile } from "@/lib/mock-data";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  // Safely read created date from various API shapes
  const memberSince = useMemo(() => {
    const raw =
        (user as any)?.createdAt ||
        (user as any)?.created_at ||
        (user as any)?.created ||
        null;
    if (!raw) return "—";
    const d = new Date(raw);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  }, [user]);

  const initials = (user?.name || "?").trim().slice(0, 1).toUpperCase();

  const skills: string[] =
      (user as any)?.skills?.length ? (user as any).skills : mockProfile.skills || [];

  const bio: string | undefined =
      (user as any)?.bio || mockProfile.bio || undefined;

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
      toast.success("Logged out successfully");
    }
  };

  const handleClearCache = () => {
    if (confirm("Clear all offline data? This cannot be undone.")) {
      // put your cache-clearing logic here if any (e.g., caches.delete(), localforage.clear(), etc.)
      toast.success("Cache cleared successfully");
    }
  };

  return (
      <div className="min-h-screen bg-background pb-20">
        <div className="mx-auto max-w-screen-lg px-4 py-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-1">Profile</h1>
            <p className="text-muted-foreground">Manage your account and settings</p>
          </div>

          {/* Profile Card */}
            <Card className="max-w-xl mx-auto bg-gradient-to-b from-white to-muted/20 rounded-2xl shadow-md border border-border">
              <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                {/* Avatar */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md ring-4 ring-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-3xl font-semibold text-primary">
                    {initials}
                  </div>
                  {user?.photo && (
                    <img
                      src={user.photo}
                      alt={user.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {user?.isActive && (
                    <span className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 ring-1 ring-emerald-500/30">
                      <BadgeCheck className="h-3 w-3" />
                      Active
                    </span>
                  )}
                </div>

                {/* Name & Role */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">{user?.name || "—"}</h2>
                  {user?.role && (
                    <p className="text-sm text-muted-foreground capitalize mt-1 tracking-wide">
                      {user.role}
                    </p>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
                  {user?.email && (
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-primary" /> {user.email}
                    </span>
                  )}
                  {user?.district && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" /> {user.district}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <User2 className="h-4 w-4 text-primary" />
                    Member since{" "}
                    <span className="font-medium text-foreground ml-1">{memberSince}</span>
                  </span>
                </div>

                {/* Bio */}
                {bio && (
                  <p className="text-sm text-foreground/80 leading-relaxed max-w-md border-t pt-4">
                    {bio}
                  </p>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div className="pt-4 border-t w-full max-w-md">
                    <h3 className="mb-3 text-sm font-semibold text-left text-foreground">Skills</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {skills.map((skill, i) => (
                        <Badge key={`${skill}-${i}`} variant="secondary" className="px-3 py-1 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Edit Button */}
                <Button
                  size="sm"
                  className="mt-4 rounded-full px-6"
                  onClick={() => navigate("/settings")}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>



          {/* Account Actions */}
          <Card className="card-elevated">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold">Account Actions</h3>
              <div className="space-y-3">
                <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>

                {user?.role === "admin" && (
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate("/admin")}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="card-elevated">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-bold">Settings</h3>

              <div className="flex items-center justify-between">
                <span className="text-sm">Language</span>
                <LanguageSwitcher />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Text-to-Speech</p>
                  <p className="text-xs text-muted-foreground">Auto-play audio for stories</p>
                </div>
                <Button
                    variant={ttsEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTtsEnabled((v) => !v)}
                >
                  {ttsEnabled ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Auto-Download</p>
                  <p className="text-xs text-muted-foreground">Download content packs on Wi-Fi</p>
                </div>
                <Button
                    variant={autoDownload ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoDownload((v) => !v)}
                >
                  {autoDownload ? "On" : "Off"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Utilities */}
          <div className="space-y-3">
            <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleClearCache}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Offline Cache
            </Button>

            {/* Secondary sign out (same as Logout above) */}
            <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Version info */}
          <div className="text-center text-xs text-muted-foreground">
            <p>Arunoda v1.0.0</p>
            <p>Made with  for Rural Communities</p>
          </div>
        </div>

      </div>
  );
}
