"use client";

import Link from "next/link";

import WorkspaceShell from "@/components/layout/WorkspaceShell";
import ExecutiveReport from "@/components/insights/ExecutiveReport";
import { useAISummary } from "@/context/AISummaryContext";

export default function InsightsPage() {
    const { hydrated, status, summary, error, regenerate } =
        useAISummary();

    // Nothing uploaded yet.
    if (hydrated && status === "idle") {
        return (
            <WorkspaceShell>
                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Intelligence
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        No dataset loaded
                    </h1>

                    <p className="mt-3 text-base leading-6 text-slate-500">
                        Upload a CSV before generating the AI summary.
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

    const loading = !hydrated || status === "loading";

    return (
        <WorkspaceShell>
            <div className="mx-auto max-w-7xl px-6 py-10 text-base lg:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                            Intelligence
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                            Insights
                        </h1>

                        <p className="mt-3 max-w-3xl text-base leading-6 text-slate-500">
                            An AI-written executive assessment of your
                            dataset: key findings, risks, opportunities and
                            recommended next actions, based only on the
                            analysis InsightPilot has already computed.
                        </p>
                    </div>

                    {(status === "ready" || status === "error") && (
                        <button
                            type="button"
                            onClick={regenerate}
                            className="border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
                        >
                            Regenerate
                        </button>
                    )}
                </div>

                {loading && (
                    <section className="py-8" aria-live="polite">
                        <div className="flex items-center gap-3">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />

                            <p className="text-base font-medium text-slate-900">
                                Preparing your summary
                            </p>
                        </div>

                        <p className="mt-2 text-base text-slate-500">
                            This runs in the background, so you can keep
                            exploring other pages. It will be here when you
                            come back.
                        </p>

                        <div className="mt-8 space-y-6" aria-hidden="true">
                            {[0, 1, 2].map((item) => (
                                <div
                                    key={item}
                                    className="border-t border-slate-200 pt-6"
                                >
                                    <div className="h-3 w-28 animate-pulse bg-slate-100" />
                                    <div className="mt-4 h-4 w-full max-w-3xl animate-pulse bg-slate-100" />
                                    <div className="mt-3 h-4 w-2/3 animate-pulse bg-slate-100" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {status === "error" && (
                    <section className="border-b border-slate-200 py-8">
                        <h2 className="text-xl font-semibold">
                            Unable to load the AI summary
                        </h2>

                        <p className="mt-2 text-base text-slate-500">
                            {error}
                        </p>
                    </section>
                )}

                {status === "ready" && summary && (
                    <ExecutiveReport summary={summary} />
                )}
            </div>
        </WorkspaceShell>
    );
}