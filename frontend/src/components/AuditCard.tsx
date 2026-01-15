import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditListItem } from "@/services/audit.service";

interface Props {
  audit: AuditListItem;
  onClick: () => void;
}

export function AuditCard({ audit, onClick }: Props) {
  return (
    <div
      className="
    group
    rounded-xl
    bg-white/10
    backdrop-blur-md
    border border-white/10
    transition-all duration-300 ease-out
    hover:-translate-y-1
    hover:shadow-xl hover:shadow-black/20
    hover:border-white/20
  "
    >
      <Card
        onClick={onClick}
        className="cursor-pointer hover:shadow transition"
      >
        <CardHeader>
          <CardTitle className="text-sm truncate">{audit.url}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Badge>SEO Score: {audit.seo_score}</Badge>
          <p className="text-xs text-muted-foreground">
            {new Date(audit.created_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
