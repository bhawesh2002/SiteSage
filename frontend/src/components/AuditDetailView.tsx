import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuditDetail } from "@/services/audit.service";

interface Props {
  audit: AuditDetail;
}

export function AuditDetailView({ audit }: Props) {
  const performance = audit.metrics?.performance;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold break-all">{audit.url}</h1>
        <p className="text-sm text-muted-foreground">
          Created at {new Date(audit.created_at).toLocaleString()}
        </p>
      </div>

      {/* SEO Score */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Score</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className="text-base px-4 py-2">{audit.seo_score}</Badge>
        </CardContent>
      </Card>

      {/* Performance */}
      {performance && (
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div>Response time: {performance.response_time_ms} ms</div>
            <div>TTFB: {performance.ttfb_ms} ms</div>
            <div>Page size: {performance.page_size_kb} KB</div>
          </CardContent>
        </Card>
      )}

      {/* Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Detected Issues</CardTitle>
        </CardHeader>
        <CardContent>
          {audit.issues.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No major issues detected.
            </p>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {audit.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* AI Summary */}
      {audit.ai_summary && (
        <Card>
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm whitespace-pre-line">
            {audit.ai_summary}
          </CardContent>
        </Card>
      )}

      {/* AI Recommendations */}
      {audit.ai_recommendations && audit.ai_recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {audit.ai_recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
