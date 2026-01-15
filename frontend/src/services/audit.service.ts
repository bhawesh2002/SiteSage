import { apiClient } from "@/lib/api_client";

export interface AuditListItem {
  id: string;
  url: string;
  seo_score: number;
  created_at: string;
}

export interface AuditDetail extends AuditListItem {
  issues: string[];
  metrics: Record<string, any>;
  ai_summary: string | null;
  ai_recommendations: string[] | null;
}

export class AuditService {
  static createAudit(url: string): Promise<AuditDetail> {
    return apiClient.post<AuditDetail>("/audit/", { url });
  }

  static listAudits(): Promise<AuditListItem[]> {
    return apiClient.get<AuditListItem[]>("/audit/list");
  }

  static getAuditById(id: string): Promise<AuditDetail> {
    return apiClient.get<AuditDetail>(`/audit/${id}`);
  }
}
