"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuditService } from "@/services/audit.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const audit = await AuditService.createAudit(url);
      router.push(`/audit/${audit.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Analyzing…" : "Analyze"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
