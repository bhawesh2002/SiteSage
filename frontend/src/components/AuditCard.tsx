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
    <Card onClick={onClick} className="cursor-pointer hover:shadow transition">
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
  );
}
