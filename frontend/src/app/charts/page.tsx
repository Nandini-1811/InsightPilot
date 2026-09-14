"use client";

import { useEffect, useState } from "react";

import ProductNavbar from "@/components/layout/ProductNavbar";
import Breadcrumb from "@/components/common/BreadCrumb";
import QuickActions from "@/components/common/QuickActions";

import ChartsSection from "@/components/charts/ChartsSection";

export default function ChartsPage() {
    const [analysis, setAnalysis] = useState<any>(null);

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

                    <h1 className="text-3xl font-bold text-slate-900">
                        No Analysis Found
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Upload a CSV to generate business charts.
                    </p>

                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-100">

            <ProductNavbar />

            <div className="mx-auto max-w-7xl px-6 py-8">

                <Breadcrumb
                    items={[
                        {
                            label: "Overview",
                            href: "/overview",
                        },
                        {
                            label: "Business Health",
                            href: "/health",
                        },
                        {
                            label: "Charts",
                        },
                    ]}
                />

                <div className="mb-10">

                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        InsightPilot
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-slate-900">
                        Interactive Business Charts
                    </h1>

                    <p className="mt-3 max-w-3xl text-slate-600">
                        Explore each business metric using interactive
                        visualizations. Switch metrics, chart types and
                        compare Top 5, Top 10, Top 20 or the complete
                        dataset instantly.
                    </p>

                </div>

                <ChartsSection charts={analysis.charts} />

                <QuickActions
                    actions={[
                        {
                            title: "Overview",
                            description:
                                "Return to your executive dashboard.",
                            href: "/overview",
                            color: "bg-sky-500",
                        },
                        {
                            title: "Business Health",
                            description:
                                "Review your health score and business quality.",
                            href: "/health",
                            color: "bg-green-500",
                        },
                        {
                            title: "AI Summary",
                            description:
                                "Understand what your business data means.",
                            href: "/insights",
                            color: "bg-purple-500",
                        },
                    ]}
                />

            </div>

        </main>
    );
}