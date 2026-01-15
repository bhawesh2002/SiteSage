"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuditService, AuditListItem } from "@/services/audit.service";
import { AuditCard } from "./AuditCard";
import { Skeleton } from "@/components/ui/skeleton";

export function AuditCardGrid() {
  const [audits, setAudits] = useState<AuditListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    AuditService.listAudits()
      .then(setAudits)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (audits.length === 0) {
    return <p className="text-sm text-muted-foreground">No audits yet.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {audits.map((audit) => (
        <AuditCard
          key={audit.id}
          audit={audit}
          onClick={() => router.push(`/audit/${audit.id}`)}
        />
      ))}
    </div>
  );
}
