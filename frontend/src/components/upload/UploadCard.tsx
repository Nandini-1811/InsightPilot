"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Check,
    FileUp,
    Loader2,
    UploadCloud,
} from "lucide-react";

import { uploadCSV } from "@/services/api";
import { useAISummary } from "@/context/AISummaryContext";

type Props = {
    embedded?: boolean;
    onSuccess?: (analysis: any) => void;
};

const processingStages = [
    {
        label: "Uploading dataset",
        description: "Sending your CSV to InsightPilot.",
    },
    {
        label: "Analyzing dataset",
        description: "Reading structure, columns, and values.",
    },
    {
        label: "Checking missing data",
        description: "Checking data quality and consistency.",
    },
    {
        label: "Detecting capabilities",
        description: "Identifying what InsightPilot can analyze.",
    },
    {
        label: "Preparing workspace",
        description: "Calculating metrics and preparing your results.",
    },
];

export default function UploadCard({
    embedded = false,
    onSuccess,
}: Props) {
    const router = useRouter();
        const { start: startAISummary } = useAISummary();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);
    const [error, setError] = useState<string | null>(null);

    function handleBrowse() {
        inputRef.current?.click();
    }

    useEffect(() => {
        if (!loading) return;

        const interval = window.setInterval(() => {
            setStage((current) =>
                current < processingStages.length - 1
                    ? current + 1
                    : current
            );
        }, 850);

        return () => {
            window.clearInterval(interval);
        };
    }, [loading]);

    async function handleAnalyze() {
        if (!file || loading) return;

        try {
            setError(null);
            setLoading(true);
            setStage(0);

            const startTime = Date.now();

            const result = await uploadCSV(file);

            const elapsedTime = Date.now() - startTime;
            const minimumDuration = 3000;
            const remainingTime =
                minimumDuration - elapsedTime;

            if (remainingTime > 0) {
                await new Promise((resolve) =>
                    setTimeout(resolve, remainingTime)
                );
            }

            setStage(processingStages.length - 1);

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            sessionStorage.setItem(
                "analysis",
                JSON.stringify(result)
            );

            if (result.analysis_id) {
                sessionStorage.setItem(
                    "analysis_id",
                    result.analysis_id
                );
            }

            
            // Start the AI summary in the background right after upload.
            startAISummary(result);

            if (onSuccess) {
                onSuccess(result);
                setFile(null);
                setLoading(false);
                return;
            }

            router.push("/overview");
        } catch (error) {
            console.error("Upload failed:", error);

            setError(
                "We couldn't process this dataset. Please check the CSV and try again."
            );

            setLoading(false);
        }
    }

    return (
        <section
            className={
                embedded
                    ? "h-full"
                    : "border-y border-slate-200 bg-white py-20"
            }
        >
            <div
                className={`mx-auto ${
                    embedded
                        ? "h-full max-w-full"
                        : "max-w-4xl px-6 lg:px-8"
                }`}
            >
                <div
                    className={`border border-slate-200 bg-white transition-all duration-500 ${
                        embedded
                            ? "p-7"
                            : "p-10 lg:p-12"
                    }`}
                >
                    {!loading ? (
                        <>
                            <div
                                className={
                                    embedded
                                        ? ""
                                        : "text-center"
                                }
                            >
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Dataset
                                </p>

                                <h2
                                    className={`mt-3 font-semibold tracking-tight text-slate-950 ${
                                        embedded
                                            ? "text-2xl"
                                            : "text-3xl"
                                    }`}
                                >
                                    Upload dataset
                                </h2>

                                {!embedded && (
                                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
                                        Upload a CSV and InsightPilot
                                        will clean the data, detect
                                        available analysis capabilities,
                                        and prepare your workspace.
                                    </p>
                                )}
                            </div>

                            <div
                                className={`mt-7 border border-dashed border-slate-300 bg-slate-50 text-center transition-all duration-300 hover:border-slate-400 hover:bg-slate-100/70 ${
                                    embedded
                                        ? "px-5 py-9"
                                        : "px-6 py-12"
                                }`}
                            >
                                <UploadCloud className="mx-auto h-8 w-8 animate-pulse text-slate-400" />

                                <p className="mt-5 text-base font-medium text-slate-950">
                                    Drop your CSV here
                                </p>

                                <p className="mt-2 text-sm text-slate-500">
                                    or choose a file from your computer
                                </p>

                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept=".csv"
                                    hidden
                                    onChange={(e) => {
                                        setFile(
                                            e.target.files?.[0] ||
                                                null
                                        );
                                        setError(null);
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={handleBrowse}
                                    className="mt-6 inline-flex items-center gap-2 border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-950 hover:shadow-sm"
                                >
                                    <FileUp className="h-4 w-4" />
                                    Choose CSV
                                </button>

                                {file && (
                                    <div className="mx-auto mt-6 max-w-md border border-emerald-200 bg-white px-4 py-3 text-left transition-all duration-300">
                                        <p className="text-sm font-medium text-slate-950">
                                            {file.name}
                                        </p>

                                        <p className="mt-1 text-xs text-emerald-600">
                                            Ready for analysis
                                        </p>
                                    </div>
                                )}

                                <p className="mt-6 text-xs text-slate-400">
                                    CSV only · Maximum size: 10 MB
                                </p>
                            </div>

                            {error && (
                                <p className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                    {error}
                                </p>
                            )}

                            <button
                                type="button"
                                disabled={!file}
                                onClick={handleAnalyze}
                                className="mt-6 w-full border border-slate-900 bg-slate-900 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                            >
                                Analyze dataset
                            </button>
                        </>
                    ) : (
                        <div className="py-5">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        InsightPilot
                                    </p>

                                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                                        Preparing your analysis
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {file?.name}
                                    </p>
                                </div>

                                <Loader2 className="mt-1 h-6 w-6 shrink-0 animate-spin text-slate-400" />
                            </div>

                            <div className="mt-8">
                                {processingStages.map(
                                    (processingStage, index) => {
                                        const completed =
                                            index < stage;

                                        const active =
                                            index === stage;

                                        return (
                                            <div
                                                key={
                                                    processingStage.label
                                                }
                                                className={`flex gap-4 border-t border-slate-200 py-4 transition-all duration-500 ${
                                                    active
                                                        ? "opacity-100"
                                                        : completed
                                                        ? "opacity-70"
                                                        : "opacity-35"
                                                }`}
                                            >
                                                <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                                                    {completed ? (
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                                                            <Check className="h-3.5 w-3.5" />
                                                        </div>
                                                    ) : active ? (
                                                        <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
                                                    ) : (
                                                        <span className="h-2 w-2 rounded-full bg-slate-300" />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">
                                                        {
                                                            processingStage.label
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {
                                                            processingStage.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            <div className="mt-6 border-t border-slate-200 pt-5">
                                <p className="text-xs text-slate-400">
                                    InsightPilot is processing your
                                    dataset. Please keep this page open.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}