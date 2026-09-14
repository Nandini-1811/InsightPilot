"use client";

import { useEffect, useState } from "react";

import ProductNavbar from "@/components/layout/ProductNavbar";
import WorkspaceHeader from "@/components/overview/WorkspaceHeader";
import KPICards from "@/components/overview/KPICards";
import ExecutiveSummary from "@/components/overview/ExecutiveSummary";
import QuickActions from "@/components/common/QuickActions";
import UploadCard from "@/components/upload/UploadCard";

export default function OverviewPage() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysis");

    if (stored) {
      setAnalysis(JSON.parse(stored));
    }
  }, []);

  if (!analysis) {
    return (
      <main className="min-h-screen bg-slate-100">
        <ProductNavbar />

        <div className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="text-3xl font-bold text-slate-900">
            No Analysis Found
          </h2>

          <p className="mt-2 text-slate-600">
            Please upload a CSV from the home page first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <ProductNavbar />

      <div className="mx-auto max-w-7xl px-6 py-10">

        <WorkspaceHeader
          filename={analysis.filename}
          rows={analysis.rows}
          columns={analysis.columns}
          health={analysis.business_health}
          onReupload={() => setShowUploader((prev) => !prev)}
        />

        {showUploader && (
          <div className="mb-10 animate-in fade-in slide-in-from-top-2 duration-300">
            <UploadCard
              embedded
              onSuccess={(result) => {
                setAnalysis(result);
                setShowUploader(false);
              }}
            />
          </div>
        )}

        <KPICards
          revenue={analysis.business_analysis.revenue?.total ?? null}
          employees={analysis.business_analysis.employees?.average ?? null}
          growth={analysis.business_analysis.growth?.average ?? null}
          quality={analysis.data_quality.quality_score}
        />

        <ExecutiveSummary
          filename={analysis.filename}
          insights={analysis.insights}
        />

        <QuickActions
          actions={[
            {
              title: "Business Health",
              description: "Review overall business health and data quality.",
              href: "/health",
              color: "bg-green-500",
            },
            {
              title: "Charts",
              description: "Explore interactive business visualizations.",
              href: "/charts",
              color: "bg-blue-500",
            },
            {
              title: "AI Insights",
              description: "Read AI-generated findings and recommendations.",
              href: "/insights",
              color: "bg-purple-500",
            },
          ]}
        />
      </div>
    </main>
  );
}