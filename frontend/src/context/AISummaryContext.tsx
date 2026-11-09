"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { generateAISummary } from "@/services/api";

export type AISummary = {
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

export type AISummaryStatus = "idle" | "loading" | "ready" | "error";

type AISummaryContextValue = {
    hydrated: boolean;
    status: AISummaryStatus;
    summary: AISummary | null;
    error: string | null;
    start: (analysis: any) => void;
    regenerate: () => void;
};

const CACHE_KEY = "ai_summary_cache";

const AISummaryContext = createContext<AISummaryContextValue | null>(null);

// Stable fingerprint of the data the AI sees, so a cached summary is only
// reused for the same dataset.
function fingerprint(analysis: any): string {
    const payload = JSON.stringify([
        analysis?.business_health,
        analysis?.business_analysis,
        analysis?.business_validation,
        analysis?.detected_kpis,
        analysis?.insights,
        analysis?.recommendations,
    ]);

    let hash = 5381;

    for (let i = 0; i < payload.length; i++) {
        hash = ((hash << 5) + hash + payload.charCodeAt(i)) | 0;
    }

    return `${analysis?.analysis_id ?? ""}:${hash}`;
}

function readCache(key: string): AISummary | null {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);

        if (!raw) return null;

        const parsed = JSON.parse(raw);

        return parsed?.key === key ? parsed.summary : null;
    } catch {
        return null;
    }
}

function writeCache(key: string, summary: AISummary) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ key, summary }));
    } catch {
        // Cache is a convenience only.
    }
}

function readStoredAnalysis(): any | null {
    try {
        const stored = sessionStorage.getItem("analysis");

        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

export function AISummaryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [hydrated, setHydrated] = useState(false);
    const [status, setStatus] = useState<AISummaryStatus>("idle");
    const [summary, setSummary] = useState<AISummary | null>(null);
    const [error, setError] = useState<string | null>(null);

    const activeKeyRef = useRef<string | null>(null);
    const requestIdRef = useRef(0);

    const run = useCallback(async (analysis: any, force: boolean) => {
        const key = fingerprint(analysis);

        if (!force && activeKeyRef.current === key) return;

        activeKeyRef.current = key;

        if (!force) {
            const cached = readCache(key);

            if (cached) {
                setSummary(cached);
                setError(null);
                setStatus("ready");
                return;
            }
        }

        const requestId = ++requestIdRef.current;

        setSummary(null);
        setError(null);
        setStatus("loading");

        try {
            const result = await generateAISummary(analysis);

            if (requestId !== requestIdRef.current) return;

            if (result?.error) {
                throw new Error(result.error);
            }

            if (!result?.ai_summary) {
                throw new Error("The AI returned an empty summary.");
            }

            writeCache(key, result.ai_summary);
            setSummary(result.ai_summary);
            setStatus("ready");
        } catch (err) {
            if (requestId !== requestIdRef.current) return;

            console.error("AI summary error:", err);

            activeKeyRef.current = null;
            setError(
                err instanceof Error && err.message
                    ? err.message
                    : "Unable to retrieve the AI summary."
            );
            setStatus("error");
        }
    }, []);

    // On first load or refresh, pick up the dataset already in sessionStorage.
    useEffect(() => {
        const analysis = readStoredAnalysis();

        if (analysis) {
            void run(analysis, false);
        }

        setHydrated(true);
    }, [run]);

    const start = useCallback(
        (analysis: any) => {
            if (analysis) void run(analysis, false);
        },
        [run]
    );

    const regenerate = useCallback(() => {
        const analysis = readStoredAnalysis();

        if (analysis) void run(analysis, true);
    }, [run]);

    const value = useMemo(
        () => ({ hydrated, status, summary, error, start, regenerate }),
        [hydrated, status, summary, error, start, regenerate]
    );

    return (
        <AISummaryContext.Provider value={value}>
            {children}
        </AISummaryContext.Provider>
    );
}

export function useAISummary() {
    const context = useContext(AISummaryContext);

    if (!context) {
        throw new Error(
            "useAISummary must be used inside <AISummaryProvider>."
        );
    }

    return context;
}