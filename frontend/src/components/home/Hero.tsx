"use client";

import { useState } from "react";
import {
    ArrowRight,
    BarChart3,
    Database,
    ShieldCheck,
} from "lucide-react";

const flipCards = [
    {
        id: "quality",
        label: "Data Quality",
        value: "Verified",
        subtitle: "Cleaning and validation",
        description:
            "InsightPilot checks the uploaded dataset for missing values, duplicates, and other data-quality issues before analysis.",
    },
    {
        id: "analysis",
        label: "Analysis",
        value: "Detected",
        subtitle: "Dataset capabilities",
        description:
            "InsightPilot identifies which analytical capabilities are supported by the columns and data available in your dataset.",
    },
    {
        id: "metrics",
        label: "Business Metrics",
        value: "Calculated",
        subtitle: "Supported metrics",
        description:
            "Deterministic business metrics are calculated from the information available in the dataset.",
    },
    {
        id: "insights",
        label: "Insights",
        value: "Explained",
        subtitle: "AI interpretation",
        description:
            "AI can interpret calculated metrics and detected patterns while keeping unsupported conclusions out of the analysis.",
    },
];

type Props = {
    onUploadClick: () => void;
};

export default function Hero({ onUploadClick }: Props) {
    const [flippedCard, setFlippedCard] = useState<string | null>(null);

    return (
        <>
            <section className="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-24 lg:pt-36">
                <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
                    {/* LEFT */}
                    <div
                        style={{
                            animation:
                                "heroFadeUp 0.7s ease-out both",
                        }}
                    >
                        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                            <span
                                className="h-2 w-2 rounded-full bg-emerald-500"
                                style={{
                                    animation:
                                        "heroPulse 2s ease-in-out infinite",
                                }}
                            />

                            Analytics workspace
                        </div>

                        <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
                            Turn your business
                            <span className="block">
                                data
                            </span>

                            <span className="block text-slate-500">
                                into useful analysis.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-500">
                            Upload a CSV and InsightPilot cleans the
                            data, evaluates what can be analyzed,
                            calculates supported business metrics,
                            and turns the results into an interactive
                            analytics workspace.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={onUploadClick}
                                className="group inline-flex items-center gap-2 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                                Upload CSV

                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                            <a
                                href="#how-it-works"
                                className="inline-flex items-center border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
                            >
                                How it works
                            </a>
                        </div>

                        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <Database className="h-4 w-4 text-slate-400" />
                                CSV-based analysis
                            </div>

                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-slate-400" />
                                Data quality checks
                            </div>

                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-slate-400" />
                                Interactive analytics
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div
                        style={{
                            animation:
                                "heroFadeIn 0.9s 0.15s ease-out both",
                        }}
                    >
                        <div className="w-full border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                            {/* HEADER */}
                            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        InsightPilot
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-900">
                                        Analytics workspace
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-emerald-600">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Ready
                                </div>
                            </div>

                            {/* FLIP CARDS */}
                            <div className="grid grid-cols-2">
                                {flipCards.map((card, index) => {
                                    const isFlipped =
                                        flippedCard === card.id;

                                    const isRightColumn =
                                        index % 2 === 1;

                                    const isBottomRow =
                                        index >= 2;

                                    return (
                                        <button
                                            key={card.id}
                                            type="button"
                                            aria-label={`Show more information about ${card.label}`}
                                            aria-pressed={isFlipped}
                                            onClick={() =>
                                                setFlippedCard(
                                                    isFlipped
                                                        ? null
                                                        : card.id
                                                )
                                            }
                                            className={`group relative h-48 text-left [perspective:1000px] ${
                                                !isRightColumn
                                                    ? "border-r"
                                                    : ""
                                            } ${
                                                !isBottomRow
                                                    ? "border-b"
                                                    : ""
                                            } border-slate-200`}
                                        >
                                            <div
                                                className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                                                    isFlipped
                                                        ? "[transform:rotateY(180deg)]"
                                                        : ""
                                                }`}
                                            >
                                                {/* FRONT */}
                                                <div className="absolute inset-0 bg-slate-50 p-6 [backface-visibility:hidden] transition-colors duration-300 group-hover:bg-slate-100">
                                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                        {card.label}
                                                    </p>

                                                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                                                        {card.value}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {card.subtitle}
                                                    </p>

                                                    <p className="mt-4 text-xs font-medium text-slate-400">
                                                        Click to explore
                                                    </p>
                                                </div>

                                                {/* BACK */}
                                                <div className="absolute inset-0 bg-slate-950 p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                        {card.label}
                                                    </p>

                                                    <p className="mt-3 text-sm leading-6 text-slate-300">
                                                        {card.description}
                                                    </p>

                                                    <p className="mt-3 text-xs font-medium text-slate-500">
                                                        Click to return
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* FLOW */}
                            <div className="border-t border-slate-200 px-6 py-5">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    Analysis flow
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                    <span>Upload</span>
                                    <span className="text-slate-300">
                                        →
                                    </span>
                                    <span>Clean</span>
                                    <span className="text-slate-300">
                                        →
                                    </span>
                                    <span>Analyze</span>
                                    <span className="text-slate-300">
                                        →
                                    </span>
                                    <span>Explore</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}