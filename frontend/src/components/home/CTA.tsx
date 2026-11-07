"use client";

export default function CTA() {
    return (
        <section className="border-t border-slate-200 bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="flex flex-col gap-8 border-y border-slate-200 py-10 md:flex-row md:items-center md:justify-between">

                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Get started
                        </p>

                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                            Bring your dataset into InsightPilot.
                        </h2>

                        <p className="mt-3 text-base leading-7 text-slate-500">
                            Upload a CSV to see what your data can support
                            and explore the resulting analytics workspace.
                        </p>
                    </div>

                    <a
                        href="#upload"
                        className="inline-flex shrink-0 items-center justify-center border border-slate-900 bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Upload CSV
                    </a>

                </div>

            </div>
        </section>
    );
}