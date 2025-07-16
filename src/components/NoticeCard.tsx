import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Clock } from "lucide-react";
import { Notice } from "@/types/notice";
import { formatDistanceToNow } from "date-fns";

interface NoticeCardProps {
  notice: Notice;
}

export const NoticeCard = ({ notice }: NoticeCardProps) => {
  const timeAgo = formatDistanceToNow(notice.createdAt, { addSuffix: true });

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-br from-card to-muted/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground truncate">{notice.name}</h3>
          </div>
          <Badge variant="secondary" className="shrink-0 bg-accent/20 text-accent-foreground border-accent/30">
            <MapPin className="h-3 w-3 mr-1" />
            {notice.region}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-foreground/80 leading-relaxed mb-3">{notice.message}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {timeAgo}
        </div>
      </CardContent>
    </Card>
  );
};