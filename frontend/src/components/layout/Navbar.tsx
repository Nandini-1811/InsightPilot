"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Menu, X } from "lucide-react";

type Props = {
    onUploadClick: () => void;
};

export default function Navbar({
    onUploadClick,
}: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    function handleMobileUpload() {
        setMenuOpen(false);
        onUploadClick();
    }

    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                        onClick={() => setMenuOpen(false)}
                    >
                        <div className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-950 text-white">
                            <BarChart3 className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-base font-semibold tracking-tight text-slate-950">
                                InsightPilot
                            </p>

                            <p className="text-xs text-slate-400">
                                Analytics workspace
                            </p>
                        </div>
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <a
                            href="#features"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
                        >
                            Features
                        </a>

                        <a
                            href="#how-it-works"
                            className="text-sm font-medium text-slate-500 transition hover:text-slate-950"
                        >
                            How it works
                        </a>
                    </nav>

                    {/* Desktop CTA */}
                    <button
                        type="button"
                        onClick={onUploadClick}
                        className="hidden border border-slate-900 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm md:inline-flex"
                    >
                        Get started
                    </button>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label={
                            menuOpen
                                ? "Close navigation"
                                : "Open navigation"
                        }
                        aria-expanded={menuOpen}
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 md:hidden"
                    >
                        {menuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Mobile navigation */}
                {menuOpen && (
                    <div className="border-t border-slate-200 py-4 md:hidden">
                        <nav className="flex flex-col">
                            <a
                                href="#features"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="border-b border-slate-100 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                            >
                                Features
                            </a>

                            <a
                                href="#how-it-works"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                className="border-b border-slate-100 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                            >
                                How it works
                            </a>

                            <button
                                type="button"
                                onClick={handleMobileUpload}
                                className="py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                            >
                                Upload dataset
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}