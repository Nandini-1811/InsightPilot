"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import WorkspaceShell from "@/components/layout/WorkspaceShell";

type Analysis = {
    filename: string;
    data_quality: {
        quality_score: number;
        missing_cells: number;
        duplicate_rows?: number;

        dimensions?: {
            completeness?: number;
            uniqueness?: number;
            structural_quality?: number;
            validity?: number;
        };
        remaining_issues?: any[];
        repairs?: any[];
        column_quality?: Record<
            string,
            {
                missing?: number;
                non_missing?: number;
                coverage?: number;
            }
        >;
    };
};

function percentage(value?: number) {
    if (value === undefined || value === null) {
        return "N/A";
    }

    return `${value.toFixed(2)}%`;
}

export default function DataQualityPage() {
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
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Data
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        No dataset loaded
                    </h1>

                    <p className="mt-3 text-base leading-6 text-slate-500">
                        Upload a CSV before inspecting data quality.
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

    const quality = analysis.data_quality;
    
    return (
        <WorkspaceShell>

            <div className="mx-auto max-w-7xl px-6 py-10 text-base lg:px-8">

                <div className="border-b border-slate-200 pb-8">

                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                        Data
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        Data Quality
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        {analysis.filename}
                    </p>

                    <p className="mt-3 text-base leading-6 text-slate-500">
                        Inspect completeness, uniqueness, numeric validity
                        and structural issues remaining after dataset cleaning.
                    </p>

                </div>

                <section className="grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-4">

                    {[
                        ["Quality score", percentage(quality.quality_score)],
                        ["Completeness", percentage(quality.dimensions?.completeness)],
                        ["Uniqueness", percentage(quality.dimensions?.uniqueness)],
                        ["Numeric validity", percentage(quality.dimensions?.validity)],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="border-t border-slate-200 pt-4"
                        >
                            <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                                {label}
                            </p>

                            <p
                                className={`mt-2 ${label === "Quality score"
                                    ? "text-3xl font-semibold"
                                    : "text-2xl font-semibold"
                                    }`}
                            >
                                {value}
                            </p>
                        </div>
                    ))}

                </section>

                <section className="border-t border-slate-200 py-8">

                    <div className="grid gap-8 md:grid-cols-3">

                        <div>
                            <p className="text-sm uppercase tracking-wide text-slate-400">
                                Missing cells
                            </p>

                            <p className="mt-2 text-2xl font-semibold">
                                {quality.missing_cells}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm uppercase tracking-wide text-slate-400">
                                Duplicate rows
                            </p>

                            <p className="mt-2 text-2xl font-semibold">
                                {quality.duplicate_rows ?? "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm uppercase tracking-wide text-slate-400">
                                Structural quality
                            </p>

                            <p className="mt-2 text-2xl font-semibold">
                                {percentage(
                                    quality.dimensions?.structural_quality
                                )}
                            </p>
                        </div>

                    </div>

                </section>

                <section className="border-t border-slate-200 py-8">

                    <h2 className="text-2xl font-semibold">
                        Remaining issues
                    </h2>

                    {quality.remaining_issues &&
                        quality.remaining_issues.length > 0 ? (
                        <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                            {quality.remaining_issues.map(
                                (issue: any, index: number) => (
                                    <div
                                        key={index}
                                        className="py-4"
                                    >
                                        <p className="text-base font-medium text-slate-900">
                                            {issue.type ??
                                                "Data quality issue"}
                                        </p>

                                        <p className="mt-1 text-base text-slate-500">
                                            {issue.message ??
                                                JSON.stringify(issue)}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="mt-4 text-sm text-slate-500">
                            No remaining data quality issues were detected.
                        </p>
                    )}

                </section>
                <section className="border-t border-slate-200 py-8">

                    <h2 className="text-xl font-semibold">
                        Cleaning activity
                    </h2>

                    {quality.repairs &&
                        quality.repairs.length > 0 ? (
                        <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                            {quality.repairs.map(
                                (repair: any, index: number) => (
                                    <div
                                        key={index}
                                        className="py-4"
                                    >
                                        <p className="text-base font-medium text-slate-900">
                                            {repair.type === "duplicate_rows"
                                                ? "Duplicate rows"
                                                : repair.type === "numeric_normalization"
                                                    ? "Numeric normalization"
                                                    : "Dataset repair"}
                                        </p>

                                        <p className="mt-1 text-base text-slate-500">
                                            {repair.type === "duplicate_rows"
                                                ? `${repair.count} duplicate row(s) removed.`
                                                : repair.type === "numeric_normalization"
                                                    ? `${repair.column} values were normalized (${repair.count} value(s) converted).`
                                                    : repair.message ?? "Dataset repair completed."
                                            }
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <p className="mt-4 text-sm text-slate-500">
                            No cleaning repairs were required.
                        </p>
                    )}

                </section>

                <section className="border-t border-slate-200 py-8">

                    <h2 className="text-xl font-semibold">
                        Column coverage
                    </h2>

                    <div className="mt-5 overflow-hidden border-y border-slate-200">

                        {Object.entries(
                            quality.column_quality ?? {}
                        ).map(([column, details]) => (
                            <div
                                key={column}
                                className="grid grid-cols-[1fr_auto] gap-6 border-b border-slate-100 py-4 last:border-b-0"
                            >
                                <div>
                                    <p className="text-base font-medium">
                                        {column}
                                    </p>

                                    <p className="mt-1 text-base text-slate-400">
                                        {details.non_missing ?? 0} non-missing
                                        {" · "}
                                        {details.missing ?? 0} missing
                                    </p>
                                </div>

                                <p className="text-base font-medium">
                                    {percentage(details.coverage)}
                                </p>
                            </div>
                        ))}

                    </div>

                </section>

            </div>

        </WorkspaceShell>
    );
}