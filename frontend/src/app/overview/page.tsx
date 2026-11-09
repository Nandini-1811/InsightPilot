"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import WorkspaceShell from "@/components/layout/WorkspaceShell";
import UploadCard from "@/components/upload/UploadCard";

type Analysis = {
    filename: string;
    rows: number;
    columns: number;

    data_quality: {
        quality_score: number;
        missing_cells: number;
        duplicate_rows?: number;
        remaining_issues?: any[];
    };

    analysis_readiness?: {
        status: string;
        confidence?: string;
        analysis_coverage?: number;
        capabilities?: {
            available?: number;
            partial?: number;
            unavailable?: number;
            total?: number;
        };
    };

    business_health?: {
        status: string;
        confidence?: string;
        analysis_coverage?: number;
        capabilities?: {
            available?: number;
            partial?: number;
            unavailable?: number;
            total?: number;
        };
    };

    business_analysis: {
        revenue?: {
            total?: number;
            average?: number;
            maximum?: number;
            minimum?: number;
        };

        profit?: {
            total?: number;
            average?: number;
            maximum?: number;
            minimum?: number;
        };

        cost?: {
            total?: number;
            average?: number;
            maximum?: number;
            minimum?: number;
        };

        derived_metrics?: {
            profit_margin?: {
                value?: number;
                formula?: string;
            };

            cost_revenue_ratio?: {
                value?: number;
                formula?: string;
            };
        };
    };

    insights?: any[];
};

function formatNumber(value?: number) {
    if (value === undefined || value === null) {
        return "N/A";
    }

    return value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });
}

function formatCurrency(value?: number) {
    if (value === undefined || value === null) {
        return "N/A";
    }

    return `$${value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    })}`;
}

function formatPercentage(value?: number) {
    if (value === undefined || value === null) {
        return "N/A";
    }

    return `${value.toFixed(2)}%`;
}

function Metric({
    label,
    value,
    description,
    featured = false,
}: {
    label: string;
    value: string;
    description: string;
    featured?: boolean;
}) {
    return (
        <div className="border-t border-slate-200 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p
                className={
                    featured
                        ? "mt-2 text-3xl font-semibold tracking-tight text-slate-950"
                        : "mt-2 text-2xl font-semibold tracking-tight text-slate-950"
                }
            >
                {value}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                {description}
            </p>
        </div>
    );
}

export default function OverviewPage() {
    const [analysis, setAnalysis] =
        useState<Analysis | null>(null);

    const [showUploader, setShowUploader] =
        useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem("analysis");

        if (!stored) {
            return;
        }

        try {
            setAnalysis(JSON.parse(stored));
        } catch {
            setAnalysis(null);
        }
    }, []);

    if (!analysis) {
        return (
            <WorkspaceShell>

                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">

                    <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                        Workspace
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                        No dataset loaded
                    </h1>

                    <p className="mt-3 max-w-xl text-slate-500">
                        Upload a CSV from the home page to begin your
                        analysis.
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

    const readiness =
        analysis.analysis_readiness ??
        analysis.business_health;

    const business = analysis.business_analysis;

    return (
        <WorkspaceShell>

            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

                {/* Header */}

                <section className="border-b border-slate-200 pb-8">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Executive overview
                            </p>

                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                                {analysis.filename}
                            </h1>

                            <p className="mt-3 text-base leading-6 text-slate-500">
                                A high-level view of dataset quality, analysis readiness, and the
                                business metrics InsightPilot can currently support.
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                {analysis.rows.toLocaleString()} rows
                                {" · "}
                                {analysis.columns} columns
                                {" · "}
                                Analysis workspace
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setShowUploader((current) => !current)
                            }
                            className="border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white"
                        >
                            {showUploader
                                ? "Close upload"
                                : "Re-upload dataset"}
                        </button>

                    </div>

                </section>

                {/* Re-upload */}

                {showUploader && (
                    <section className="border-b border-slate-200 py-8">

                        <UploadCard
                            embedded
                            onSuccess={(result) => {
                                sessionStorage.setItem(
                                    "analysis",
                                    JSON.stringify(result)
                                );

                                setAnalysis(result);
                                setShowUploader(false);
                            }}
                        />

                    </section>
                )}

                {/* Readiness + Quality */}

                <section className="border-y border-slate-200 py-8">

                    <div className="grid gap-8 lg:grid-cols-2">

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Analysis readiness
                            </p>

                            <div className="mt-3 flex items-baseline gap-3">

                                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                                    {readiness?.status ?? "Unknown"}
                                </h2>

                                {readiness?.confidence && (
                                    <span className="text-sm font-medium text-slate-500">
                                        {readiness.confidence} confidence
                                    </span>
                                )}

                            </div>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                                InsightPilot can currently support analysis based on the
                                business capabilities detected in this dataset.
                            </p>

                            <Link
                                href="/readiness"
                                className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4"
                            >
                                View analysis readiness →
                            </Link>

                        </div>

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Data quality
                            </p>

                            <div className="mt-3 flex items-baseline gap-3">

                                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                                    {formatPercentage(
                                        analysis.data_quality.quality_score
                                    )}
                                </h2>

                                <span className="text-sm font-medium text-slate-500">
                                    quality score
                                </span>

                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {analysis.data_quality.missing_cells} missing values remain
                                after cleaning.
                            </p>

                            <Link
                                href="/data-quality"
                                className="mt-4 inline-block text-sm font-medium text-slate-900 underline underline-offset-4"
                            >
                                Inspect data quality →
                            </Link>

                        </div>

                    </div>

                </section>

                {/* Business metrics */}

                <section className="border-t border-slate-200 py-8">

                    <div className="mb-6">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Business performance
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-slate-950">
                            Core business metrics
                        </h2>

                    </div>

                    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-4">

                        <Metric
                            label="Revenue"
                            value={formatCurrency(
                                business.revenue?.total
                            )}
                            description="Total revenue"
                            featured
                        />

                        <Metric
                            label="Profit"
                            value={formatCurrency(
                                business.profit?.total
                            )}
                            description="Total profit"
                            featured
                        />

                        <Metric
                            label="Cost"
                            value={formatCurrency(
                                business.cost?.total
                            )}
                            description="Total cost"
                        />

                        <Metric
                            label="Profit margin"
                            value={formatPercentage(
                                business.derived_metrics
                                    ?.profit_margin?.value
                            )}
                            description="Profit ÷ revenue"
                        />

                    </div>

                </section>

                {/* Derived metrics */}

                <section className="border-t border-slate-200 py-8">

                    <div className="mb-6">

                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Derived metrics
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-slate-950">
                            Calculated business metrics
                        </h2>

                    </div>

                    <div className="grid gap-8 md:grid-cols-2">

                        <Metric
                            label="Cost / revenue"
                            value={formatPercentage(
                                business.derived_metrics
                                    ?.cost_revenue_ratio?.value
                            )}
                            description="Cost ÷ revenue"
                        />

                        <Metric
                            label="Average profit"
                            value={formatCurrency(
                                business.profit?.average
                            )}
                            description="Mean profit across records"
                        />

                    </div>

                </section>

            </div>

        </WorkspaceShell>
    );
}