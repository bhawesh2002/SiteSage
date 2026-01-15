"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auditService } from "@/services/audit.service";

interface SearchBarProps {
  onLoadingChange?: (loading: boolean) => void;
}

export function SearchBar({ onLoadingChange }: SearchBarProps) {
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError("Please enter a valid website URL.");
      return;
    }

    try {
      setSubmitting(true);
      onLoadingChange?.(true);

      // Backend returns full AuditResponse
      const audit = await auditService.createAudit(url.trim());

      // ✅ Navigate directly to audit detail page
      router.push(`/audit/${audit.id}`);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Something went wrong while analyzing the website."
      );
    } finally {
      setSubmitting(false);
      onLoadingChange?.(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={submitting}
          className="
            bg-white/90
            text-black
            placeholder:text-gray-500
            focus-visible:ring-offset-0
          "
        />

        <Button
          type="submit"
          disabled={submitting}
          className="
            bg-black
            text-white
            hover:bg-black/80
            disabled:opacity-60
          "
        >
          {submitting ? "Analyzing…" : "Analyze"}
        </Button>
      </div>

      {error && <p className="text-sm text-red-300 text-left">{error}</p>}
    </form>
  );
}
