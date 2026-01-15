import { apiClient } from "@/lib/api_client";

/* ---------- Types ---------- */

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

/* ---------- Service ---------- */

export class AuditService {
  static async createAudit(url: string): Promise<AuditDetail> {
    const response = await apiClient.post<AuditDetail>("/audit", { url });
    return response;
  }

  static async listAudits(): Promise<AuditListItem[]> {
    const response = await apiClient.get<AuditListItem[]>("/audit/list");
    return response;
  }

  static async getAuditById(id: string): Promise<AuditDetail> {
    const response = await apiClient.get<AuditDetail>(`/audit/${id}`);
    return response;
  }
}

/* ---------- Singleton Export ---------- */

export const auditService = AuditService;
