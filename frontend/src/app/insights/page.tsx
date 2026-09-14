"use client";

import { useEffect, useState, useRef } from "react";

import ProductNavbar from "@/components/layout/ProductNavbar";
import Breadcrumb from "@/components/common/BreadCrumb";
import ExecutiveReport from "@/components/insights/ExecutiveReport";
import { generateAISummary } from "@/services/api";
import QuickActions from "@/components/common/QuickActions";

type AISummary = {
    overall_condition?: string;
    key_findings?: string[];
    risks?: string[];
    opportunities?: string[];
    next_actions?: string[];
    data_limitations?: string[];
    confidence?: {
        level?: "High" | "Medium" | "Low";
        reason?: string;
    };
};

export default function InsightsPage() {
    const [summary, setSummary] = useState<AISummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        const analysis = sessionStorage.getItem("analysis");

        if (!analysis) {
            setError("No analysis found. Please upload and analyze a CSV first.");
            setLoading(false);
            return;
        }

        let analysisData: any;

        try {
            analysisData = JSON.parse(analysis);
        } catch {
            setError("Unable to read the current analysis.");
            setLoading(false);
            return;
        }

        const fetchSummary = async () => {
            try {
                const result = await generateAISummary(analysisData);

                if (result.error) {
                    setError(result.error);
                    setLoading(false);
                    return;
                }

                setSummary(result.ai_summary);
                setLoading(false);

            } catch (err) {
                console.error("AI summary error:", err);
                setError("Unable to retrieve the AI summary.");
                setLoading(false);
            }
        };

        fetchSummary();

    }, []);

    return (
        <main className="min-h-screen bg-slate-100">
            <ProductNavbar />
            <div className="mx-auto max-w-7xl px-6 py-8">
                <Breadcrumb
                    items={[
                        { label: "Overview", href: "/overview" },
                        { label: "Business Health", href: "/health" },
                        { label: "Charts", href: "/charts" },
                        { label: "AI Summary" },
                    ]}
                />

                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        InsightPilot
                    </p>
                    <h1 className="mt-2 text-4xl font-bold text-slate-900">
                        AI Business Summary
                    </h1>
                    <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
                        Review an AI-generated executive assessment of your
                        business data, including key findings, risks,
                        opportunities and recommended next actions.
                    </p>
                </div>

                {error && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
                        <h2 className="text-xl font-bold text-red-800">
                            Unable to Load AI Summary
                        </h2>
                        <p className="mt-2 text-red-700">{error}</p>
                    </div>
                )}

                {loading && !error && (
                    <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
                            <h2 className="mt-6 text-2xl font-bold text-slate-900">
                                Generating Your AI Summary
                            </h2>
                            <p className="mt-3 max-w-xl leading-7 text-slate-600">
                                InsightPilot is analyzing your business data
                                and preparing an executive summary. This may
                                take a few moments.
                            </p>
                        </div>
                    </section>
                )}

                {!loading && !error && summary && (
                    <ExecutiveReport summary={summary} />
                )}

                <QuickActions
                    actions={[
                        { title: "Overview", description: "Return to your executive dashboard.", href: "/overview", color: "bg-sky-500" },
                        { title: "Business Health", description: "Review overall business health and data quality.", href: "/health", color: "bg-green-500" },
                        { title: "Charts", description: "Explore interactive business visualizations.", href: "/charts", color: "bg-blue-500" },
                    ]}
                />
            </div>
        </main>
    );
}