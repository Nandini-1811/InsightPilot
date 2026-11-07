"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import WorkspaceShell from "@/components/layout/WorkspaceShell";

type Capability = {
    name?: string;
    status?: string;
    coverage?: number;
};

type Readiness = {
    status: string;
    confidence?: string;
    analysis_coverage?: number;
    capabilities?: {
        available?: number;
        partial?: number;
        unavailable?: number;
        total?: number;
    };
    supported_analysis?: {
        label: string;
        description: string;
    }[];
    partial_analysis?: {
        label: string;
        description: string;
        coverage: number;
    }[];
    unavailable_analysis?: {
        label: string;
        description: string;
    }[];
    limitations?: any[];
    strengths?: any[];
    warnings?: any[];
};

type Analysis = {
    analysis_readiness?: Readiness;
    business_health?: Readiness;
};

export default function ReadinessPage() {
    const [analysis, setAnalysis] =
        useState<Analysis | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("analysis");

        if (!stored) return;

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
                    <h1 className="text-3xl font-semibold">
                        No dataset loaded
                    </h1>
                </div>
            </WorkspaceShell>
        );
    }

    const readiness =
        analysis.analysis_readiness ??
        analysis.business_health;

    if (!readiness) {
        return (
            <WorkspaceShell>
                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
                    <h1 className="text-3xl font-semibold">
                        Analysis readiness unavailable
                    </h1>
                </div>
            </WorkspaceShell>
        );
    }

    const capabilities =
        readiness.capabilities ?? {};

    return (
        <WorkspaceShell>

            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

                <section className="border-b border-slate-200 pb-8">

                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                        Data
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        Analysis Readiness
                    </h1>

                    <p className="mt-3 text-base leading-6 text-slate-500">
                        Understand which analytical capabilities are fully
                        supported, partially supported, or unavailable for
                        this dataset.
                    </p>

                </section>

                <section className="grid gap-8 py-8 md:grid-cols-3">

                    <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm uppercase tracking-wide text-slate-400">
                            Status
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                            {readiness.status}
                        </p>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm uppercase tracking-wide text-slate-400">
                            Coverage
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                            {readiness.analysis_coverage?.toFixed(2) ?? "N/A"}%
                        </p>

                        <p className="mt-2 text-base leading-5 text-slate-400">
                            Based on {capabilities.total ?? 0} analysis capabilities.
                            Partial capabilities count as 50%.
                        </p>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm uppercase tracking-wide text-slate-400">
                            Confidence
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                            {readiness.confidence ?? "N/A"}
                        </p>
                    </div>

                </section>

                <section className="border-t border-slate-200 py-8">

                    <h2 className="text-2xl font-semibold">
                        Capability coverage
                    </h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-3">

                        <div className="border border-slate-200 p-5">
                            <p className="text-sm uppercase tracking-wide text-slate-400">
                                Fully available
                            </p>

                            <p className="mt-2 text-3xl font-semibold">
                                {capabilities.available ?? 0}
                            </p>
                        </div>

                        <div className="border border-slate-200 p-5">
                            <p className="text-sm uppercase tracking-wide text-slate-400">
                                Partially available
                            </p>

                            <p className="mt-2 text-3xl font-semibold">
                                {capabilities.partial ?? 0}
                            </p>
                        </div>

                        <div className="border border-slate-200 p-5">
                            <p className="text-sm uppercase tracking-wide text-slate-400">
                                Unavailable
                            </p>

                            <p className="mt-2 text-3xl font-semibold">
                                {capabilities.unavailable ?? 0}
                            </p>
                        </div>

                    </div>

                </section>

                <section className="border-t border-slate-200 py-8">

                    <h2 className="text-2xl font-semibold">
                        Available capabilities
                    </h2>

                    <div className="mt-5 overflow-hidden border-y border-slate-200">

                        {readiness.supported_analysis?.map(
                            (item, index) => (
                                <div
                                    key={`supported-${index}`}
                                    className="border-b border-slate-100 py-4 last:border-b-0"
                                >
                                    <div className="flex items-center justify-between gap-6">
                                        <p className="text-base font-medium">
                                            {item.label}
                                        </p>

                                        <span className="text-base font-medium uppercase tracking-wide text-emerald-600">
                                            Fully available
                                        </span>
                                    </div>

                                    <p className="mt-1 text-base text-slate-500">
                                        {item.description}
                                    </p>
                                </div>
                            )
                        )}

                        {readiness.partial_analysis?.map(
                            (item, index) => (
                                <div
                                    key={`partial-${index}`}
                                    className="border-b border-slate-100 py-4 last:border-b-0"
                                >
                                    <div className="flex items-center justify-between gap-6">
                                        <p className="text-base font-medium">
                                            {item.label}
                                        </p>

                                        <span className="text-base font-medium uppercase tracking-wide text-amber-600">
                                            Partially available
                                        </span>
                                    </div>

                                    <p className="mt-1 text-base text-slate-500">
                                        {item.description}
                                    </p>

                                    <p className="mt-2 text-base text-slate-400">
                                        {item.coverage.toFixed(2)}% coverage
                                    </p>
                                </div>
                            )
                        )}

                        {readiness.unavailable_analysis?.map(
                            (item, index) => (
                                <div
                                    key={`unavailable-${index}`}
                                    className="border-b border-slate-100 py-4 last:border-b-0"
                                >
                                    <div className="flex items-center justify-between gap-6">
                                        <p className="text-base font-medium">
                                            {item.label}
                                        </p>

                                        <span className="text-base font-medium uppercase tracking-wide text-slate-400">
                                            Unavailable
                                        </span>
                                    </div>

                                    <p className="mt-1 text-base text-slate-500">
                                        {item.description}
                                    </p>
                                </div>
                            )
                        )}

                    </div>

                </section>

            </div>

        </WorkspaceShell>
    );
}