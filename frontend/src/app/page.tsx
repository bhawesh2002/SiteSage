"use client";

import { useState } from "react";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { SearchBar } from "@/components/SearchBar";
import { AuditCardGrid } from "@/components/AuditCardGrid";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Animated gradient background */}
      <AnimatedBackground />

      <div className="relative mx-auto max-w-5xl px-6 py-20 space-y-20">
        {/* ---------- HERO ---------- */}
        <section className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            SiteSage
          </h1>

          <p className="mx-auto max-w-2xl text-base md:text-lg text-white/90">
            Analyze websites for SEO, performance, and accessibility with
            actionable AI-powered insights.
          </p>

          <div className="mx-auto max-w-2xl pt-4">
            <SearchBar onLoadingChange={setLoading} />
          </div>
        </section>

        {/* ---------- RECENT AUDITS ---------- */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Recent Audits</h2>

          <div className="relative rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
            <LoadingOverlay visible={loading} />
            <AuditCardGrid />
          </div>
        </section>
      </div>
    </main>
  );
}
