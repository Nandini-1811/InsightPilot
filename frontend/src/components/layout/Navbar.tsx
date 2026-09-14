"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
            <BarChart3 size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              InsightPilot
            </h1>

            <p className="text-xs text-slate-500">
              AI Business Analytics
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="text-slate-600 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-slate-600 transition hover:text-blue-600"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-slate-600 transition hover:text-blue-600"
          >
            About
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#upload"
          className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}