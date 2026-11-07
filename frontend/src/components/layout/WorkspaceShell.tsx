"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    BarChart3,
    ChevronRight,
    Menu,
    X,
} from "lucide-react";

type AnalysisMeta = {
    filename?: string;
    rows?: number;
    columns?: number;
    analysis_readiness?: {
        status?: string;
    };
    business_health?: {
        status?: string;
    };
};

type Props = {
    children: React.ReactNode;
};

const navigation = [
    {
        section: "Overview",
        items: [
            {
                label: "Executive Overview",
                href: "/overview",
            },
        ],
    },
    {
        section: "Data",
        items: [
            {
                label: "Data Quality",
                href: "/data-quality",
            },
            {
                label: "Analysis Readiness",
                href: "/readiness",
            },
        ],
    },
    {
        section: "Business",
        items: [
            {
                label: "Performance",
                href: "/performance",
            },
            {
                label: "Charts",
                href: "/charts",
            },
        ],
    },
    {
        section: "Intelligence",
        items: [
            {
                label: "Insights",
                href: "/insights",
            },
        ],
    },
];

export default function WorkspaceShell({
    children,
}: Props) {
    const pathname = usePathname();

    const [analysis, setAnalysis] =
        useState<AnalysisMeta | null>(null);

    const [mobileNavOpen, setMobileNavOpen] =
        useState(false);

    useEffect(() => {
        const stored =
            sessionStorage.getItem("analysis");

        if (!stored) {
            return;
        }

        try {
            setAnalysis(JSON.parse(stored));
        } catch {
            setAnalysis(null);
        }
    }, [pathname]);

    useEffect(() => {
        setMobileNavOpen(false);
    }, [pathname]);

    const readinessStatus =
        analysis?.analysis_readiness?.status ??
        analysis?.business_health?.status ??
        "Analysis available";

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
                {/* Brand */}
                <div className="border-b border-slate-200 px-6 py-5">
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-950 text-white">
                            <BarChart3 className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-base font-semibold tracking-tight text-slate-950">
                                InsightPilot
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                                Analytics workspace
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-7">
                    {navigation.map((group) => (
                        <div
                            key={group.section}
                            className="mb-8"
                        >
                            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                                {group.section}
                            </p>

                            <div className="space-y-1">
                                {group.items.map(
                                    (item) => {
                                        const active =
                                            pathname ===
                                            item.href;

                                        return (
                                            <Link
                                                key={
                                                    item.href
                                                }
                                                href={
                                                    item.href
                                                }
                                                className={`group flex items-center justify-between border-l-2 px-3 py-2.5 text-[15px] transition-all duration-200 ${active
                                                        ? "border-slate-900 bg-slate-100 font-semibold text-slate-950"
                                                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                                                    }`}
                                            >
                                                <span>
                                                    {
                                                        item.label
                                                    }
                                                </span>

                                                {active && (
                                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                                )}
                                            </Link>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Bottom */}
                <div className="border-t border-slate-200 px-6 py-4">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileNavOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={() =>
                            setMobileNavOpen(false)
                        }
                        className="absolute inset-0 bg-slate-950/20"
                    />

                    <aside className="relative flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-xl">
                        {/* Mobile Brand */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
                            <Link
                                href="/"
                                onClick={() =>
                                    setMobileNavOpen(false)
                                }
                                className="flex items-center gap-3"
                            >
                                <div className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-950 text-white">
                                    <BarChart3 className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-base font-semibold tracking-tight text-slate-950">
                                        InsightPilot
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        Analytics workspace
                                    </p>
                                </div>
                            </Link>

                            <button
                                type="button"
                                aria-label="Close navigation"
                                onClick={() =>
                                    setMobileNavOpen(false)
                                }
                                className="flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-950"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <nav className="flex-1 overflow-y-auto px-4 py-7">
                            {navigation.map(
                                (group) => (
                                    <div
                                        key={
                                            group.section
                                        }
                                        className="mb-8"
                                    >
                                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                                            {
                                                group.section
                                            }
                                        </p>

                                        <div className="space-y-1">
                                            {group.items.map(
                                                (
                                                    item
                                                ) => {
                                                    const active =
                                                        pathname ===
                                                        item.href;

                                                    return (
                                                        <Link
                                                            key={
                                                                item.href
                                                            }
                                                            href={
                                                                item.href
                                                            }
                                                            onClick={() =>
                                                                setMobileNavOpen(
                                                                    false
                                                                )
                                                            }
                                                            className={`flex items-center justify-between border-l-2 px-3 py-3 text-[15px] transition-colors ${active
                                                                    ? "border-slate-900 bg-slate-100 font-semibold text-slate-950"
                                                                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                                                                }`}
                                                        >
                                                            <span>
                                                                {
                                                                    item.label
                                                                }
                                                            </span>

                                                            {active && (
                                                                <ChevronRight className="h-4 w-4 text-slate-400" />
                                                            )}
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </nav>

                        <div className="border-t border-slate-200 px-6 py-4">
                            <Link
                                href="/"
                                onClick={() =>
                                    setMobileNavOpen(
                                        false
                                    )
                                }
                                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </aside>
                </div>
            )}

            {/* Main Workspace */}
            <div className="lg:pl-64">
                {/* Topbar */}
                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="flex min-h-20 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            aria-label="Open navigation"
                            aria-expanded={mobileNavOpen}
                            onClick={() => setMobileNavOpen(true)}
                            className="flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        {/* Dataset Information */}
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-lg font-semibold tracking-tight text-slate-950">
                                {analysis?.filename ?? "No dataset loaded"}
                            </p>

                            {analysis && (
                                <p className="mt-1 text-base text-slate-400">
                                    {analysis.rows?.toLocaleString()} rows
                                    {" · "}
                                    {analysis.columns} columns
                                </p>
                            )}
                        </div>

                        {/* Workspace Status */}
                        <div className="flex shrink-0 items-center gap-4">
                            {analysis && (
                                <div className="hidden items-center gap-2 text-base font-medium text-slate-600 sm:flex">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                                    {readinessStatus}
                                </div>
                            )}

                            <Link
                                href="/"
                                className="border border-slate-300 px-4 py-2.5 text-base font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
                            >
                                New dataset
                            </Link>
                        </div>
                    </div>
                </header>
                {/* Page */}
                <main>{children}</main>
            </div>
        </div>
    );
}