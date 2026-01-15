"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AuditService, AuditDetail } from "@/services/audit.service";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuditDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [audit, setAudit] = useState<AuditDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAudit() {
      try {
        const data = await AuditService.getAuditById(id);
        setAudit(data);
      } catch {
        setError("Failed to load audit details.");
      } finally {
        setLoading(false);
      }
    }

    fetchAudit();
  }, [id]);

  if (loading) {
    return <AuditDetailSkeleton />;
  }

  if (error || !audit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Audit not found"}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* ---------------- HEADER ---------------- */}
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            SEO Audit Report
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span>{audit.url}</span>

            {audit.seo_score !== null && (
              <Badge variant="secondary">
                SEO Score: {audit.seo_score}/100
              </Badge>
            )}
          </div>
        </header>

        {/* ---------------- METRICS ---------------- */}
        {/* -------- SEO METRICS -------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">SEO Metrics</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(audit.metrics)
              .filter(([key]) => key !== "performance")
              .map(([key, value]) => (
                <Card
                  key={key}
                  className="bg-white/5 border-white/10 text-white"
                >
                  <div className="p-4 space-y-1">
                    <p className="text-sm text-white/60 capitalize">
                      {key.replace(/_/g, " ")}
                    </p>
                    <p className="text-xl font-semibold">
                      {value === null ? "—" : String(value)}
                    </p>
                  </div>
                </Card>
              ))}
          </div>
        </section>
        {/* -------- PERFORMANCE -------- */}
        {audit.metrics.performance && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Performance Metrics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                label="Time to First Byte"
                value={`${audit.metrics.performance.ttfb_ms.toFixed(0)} ms`}
              />

              <MetricCard
                label="Response Time"
                value={`${audit.metrics.performance.response_time_ms.toFixed(
                  0
                )} ms`}
              />

              <MetricCard
                label="Page Size"
                value={`${audit.metrics.performance.page_size_kb} KB`}
              />
            </div>
          </section>
        )}

        {/* ---------- AI INSIGHTS ---------- */}
        {(audit.ai_summary || audit.ai_recommendations) && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">AI Insights</h2>

            {/* ----- Summary ----- */}
            {audit.ai_summary && (
              <div className="space-y-4 text-white/90 leading-relaxed">
                {audit.ai_summary.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* ----- Recommendations ----- */}
            {audit.ai_recommendations && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Actionable Improvements
                </h3>

                <ul className="space-y-3">
                  {audit.ai_recommendations.map((rec, idx) => {
                    let title = "";
                    let description = "";

                    // Case 1: **Title**: description
                    const boldMatch = rec.match(/^\*\*(.*?)\*\*\s*:\s*(.*)$/);

                    if (boldMatch) {
                      title = boldMatch[1];
                      description = boldMatch[2];
                    } else {
                      // Case 2 or 3: try splitting on first colon
                      const colonIndex = rec.indexOf(":");

                      if (colonIndex !== -1) {
                        title = rec
                          .slice(0, colonIndex)
                          .replace(/\*\*/g, "")
                          .trim();
                        description = rec.slice(colonIndex + 1).trim();
                      } else {
                        // Case 3: free-form sentence (fallback)
                        title = rec.replace(/\*\*/g, "").trim();
                        description = "";
                      }
                    }

                    return (
                      <li
                        key={idx}
                        className="
        rounded-lg
        bg-white/10
        border border-white/10
        p-4
        hover:-translate-y-0.5
        transition
      "
                      >
                        <p className="font-semibold text-white">{title}</p>

                        {description && (
                          <p className="text-sm text-white/80 mt-1 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

/* ---------------- LOADING SKELETON ---------------- */

function AuditDetailSkeleton() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-10">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>

        <Skeleton className="h-40 w-full" />
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-white/10 border-white/10 text-white">
      <div className="p-4 space-y-1">
        <p className="text-sm text-white/60">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </Card>
  );
}
