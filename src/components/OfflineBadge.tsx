import { WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function OfflineBadge() {
  return (
    <Badge variant="secondary" className="badge-offline">
      <WifiOff className="h-3 w-3" />
      <span>Available Offline</span>
    </Badge>
  );
}
