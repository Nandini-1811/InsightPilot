"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import WorkspaceShell from "@/components/layout/WorkspaceShell";
import ChartsSection from "@/components/charts/ChartsSection";

export default function ChartsPage() {
    const [analysis, setAnalysis] = useState<any>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("analysis");

        if (stored) {
            try {
                setAnalysis(JSON.parse(stored));
            } catch {
                setAnalysis(null);
            }
        }
    }, []);

    if (!analysis) {
        return (
            <WorkspaceShell>
                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Business
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                        No dataset loaded
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                        Upload a CSV from the home page to generate
                        business charts.
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-flex border border-slate-900 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Upload dataset
                    </Link>
                </div>
            </WorkspaceShell>
        );
    }

    const charts = analysis.charts ?? {};

    const chartEntries = Object.entries(charts);

    return (
        <WorkspaceShell>
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

                {/* Page header */}
                <section className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Business
                            </p>

                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                                Charts
                            </h1>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                                Explore detected business metrics through
                                interactive visualizations.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Metrics
                                </p>

                                <p className="mt-1 font-semibold text-slate-900">
                                    {chartEntries.length}
                                </p>
                            </div>

                            <div className="h-8 w-px bg-slate-200" />

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Dataset
                                </p>

                                <p className="mt-1 max-w-48 truncate font-medium text-slate-700">
                                    {analysis.filename ?? "Current dataset"}
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Analytical context */}
                <section className="border-b border-slate-200 py-6">
                    <div className="grid gap-6 md:grid-cols-3">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                What you are seeing
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Charts are generated from the business metrics
                                InsightPilot detected in your dataset.
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                How values are grouped
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Additive metrics such as revenue, profit,
                                cost, and sales are aggregated by the
                                detected business dimension.
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Data-aware analysis
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Snapshot metrics such as employee counts are
                                kept as observations rather than incorrectly
                                summed across products.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Charts */}
                <section className="py-8">
                    {chartEntries.length > 0 ? (
                        <ChartsSection charts={charts} />
                    ) : (
                        <div className="border border-slate-200 bg-white px-6 py-12 text-center">
                            <p className="text-sm font-medium text-slate-900">
                                No chartable metrics detected
                            </p>

                            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                                InsightPilot could not find enough supported
                                business metrics to generate charts for this
                                dataset.
                            </p>

                            <Link
                                href="/readiness"
                                className="mt-5 inline-flex border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                            >
                                View analysis readiness
                            </Link>
                        </div>
                    )}
                </section>

            </div>
        </WorkspaceShell>
    );
}