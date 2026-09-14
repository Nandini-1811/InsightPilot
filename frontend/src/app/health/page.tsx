"use client";

import { useEffect, useState } from "react";

import ProductNavbar from "@/components/layout/ProductNavbar";
import Breadcrumb from "@/components/common/BreadCrumb";
import HealthScore from "@/components/health/HealthScore";
import HealthDimensions from "@/components/health/HealthDimensions";
import StrengthsCard from "@/components/health/StrengthsCard";
import ImprovementsCard from "@/components/health/ImprovementsCard";
import Recommendations from "@/components/health/Recommendations";
import QuickActions from "@/components/common/QuickActions";

export default function HealthPage() {
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

                <div className="mx-auto max-w-7xl px-6 py-8">
                    <h2 className="text-3xl font-bold text-slate-900">
                        No Analysis Found
                    </h2>

                    <p className="mt-2 text-slate-600">
                        Please upload and analyze a CSV from the home page first.
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
                        },
                    ]}
                />

                <div className="mb-10">
                    <h1 className="text-5xl font-bold text-slate-900">
                        Business Health
                    </h1>

                    <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
                        Review your overall business health score, identify
                        strengths, uncover potential risks, and receive
                        recommendations based on your uploaded business data.
                    </p>
                </div>

                <HealthScore
                    score={analysis.business_health.overall_score}
                    status={analysis.business_health.status}
                />

                {/* Health Dimensions */}
                <HealthDimensions
                    quality={analysis.data_quality.quality_score}
                    revenue={analysis.business_analysis.revenue?.total}
                    growth={analysis.business_analysis.growth?.average}
                    employees={analysis.business_analysis.employees?.average}
                />

                <div className="mb-8 grid gap-6 lg:grid-cols-2">

                    <StrengthsCard
                        quality={analysis.data_quality.quality_score}
                        revenue={analysis.business_analysis.revenue?.total}
                        growth={analysis.business_analysis.growth?.average}
                    />

                    <ImprovementsCard
                        quality={analysis.data_quality.quality_score}
                        revenue={analysis.business_analysis.revenue?.total}
                        growth={analysis.business_analysis.growth?.average}
                        employees={analysis.business_analysis.employees?.average}
                    />

                </div>

                {/* Business Recommendations */}
                <div className="mb-10">
                    <Recommendations
                        recommendations={analysis.recommendations}
                    />
                </div>

                {/* Navigation */}
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
                            title: "Charts",
                            description:
                                "Visualize revenue, growth and business trends.",
                            href: "/charts",
                            color: "bg-blue-500",
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