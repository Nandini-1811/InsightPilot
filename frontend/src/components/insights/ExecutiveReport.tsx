"use client";

type Confidence = {
    level?: "High" | "Medium" | "Low";
    reason?: string;
};

type AISummary = {
    overall_condition?: string;
    key_findings?: string[];
    risks?: string[];
    opportunities?: string[];
    next_actions?: string[];
    data_limitations?: string[];
    confidence?: Confidence;
};

type Props = {
    summary: AISummary;
};

function SectionHeader({
    label,
    title,
}: {
    label: string;
    title: string;
}) {
    return (
        <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                {label}
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {title}
            </h2>
        </div>
    );
}

export default function ExecutiveReport({ summary }: Props) {
    return (
        <div className="space-y-8">

            {/* Overall Condition */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <SectionHeader
                    label="Executive Assessment"
                    title="Overall Business Condition"
                />

                <div className="rounded-2xl bg-slate-50 p-6">
                    <p className="text-lg leading-8 text-slate-700">
                        {summary.overall_condition ||
                            "No overall business condition was generated."}
                    </p>
                </div>

            </section>


            {/* Key Findings */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <SectionHeader
                    label="What The Data Says"
                    title="Key Findings"
                />

                <div className="space-y-4">

                    {summary.key_findings?.length ? (
                        summary.key_findings.map((finding, index) => (
                            <div
                                key={index}
                                className="flex gap-4 rounded-2xl bg-slate-50 p-5"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                    {index + 1}
                                </div>

                                <p className="leading-7 text-slate-700">
                                    {finding}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">
                            No key findings were generated.
                        </p>
                    )}

                </div>

            </section>


            {/* Risks */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <SectionHeader
                    label="Risk Assessment"
                    title="Risks"
                />

                <div className="space-y-4">

                    {summary.risks?.length ? (
                        summary.risks.map((risk, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-red-100 bg-red-50 p-5"
                            >
                                <div className="flex gap-3">

                                    <span className="mt-0.5 text-lg text-red-600">
                                        ⚠
                                    </span>

                                    <p className="leading-7 text-slate-700">
                                        {risk}
                                    </p>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">
                            No risks were identified from the available data.
                        </p>
                    )}

                </div>

            </section>


            {/* Opportunities */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <SectionHeader
                    label="Growth Potential"
                    title="Opportunities"
                />

                <div className="space-y-4">

                    {summary.opportunities?.length ? (
                        summary.opportunities.map((opportunity, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"
                            >
                                <div className="flex gap-3">

                                    <span className="mt-0.5 text-lg text-emerald-600">
                                        →
                                    </span>

                                    <p className="leading-7 text-slate-700">
                                        {opportunity}
                                    </p>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">
                            No opportunities were identified from the available data.
                        </p>
                    )}

                </div>

            </section>


            {/* Next Actions */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <SectionHeader
                    label="Action Plan"
                    title="Next Actions"
                />

                <div className="space-y-4">

                    {summary.next_actions?.length ? (
                        summary.next_actions.map((action, index) => (
                            <div
                                key={index}
                                className="flex gap-4 rounded-2xl bg-slate-50 p-5"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                                    {index + 1}
                                </div>

                                <p className="leading-7 text-slate-700">
                                    {action}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500">
                            No next actions were generated.
                        </p>
                    )}

                </div>

            </section>


            {/* Data Limitations */}
            {summary.data_limitations?.length ? (
                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <SectionHeader
                        label="Data Coverage"
                        title="Data Limitations"
                    />

                    <p className="mb-5 text-slate-600">
                        The following KPI categories were unavailable and therefore
                        limited the scope of the AI analysis.
                    </p>

                    <div className="flex flex-wrap gap-3">

                        {summary.data_limitations.map(
                            (limitation, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium capitalize text-slate-700"
                                >
                                    {limitation}
                                </span>
                            )
                        )}

                    </div>

                </section>
            ) : null}


            {/* Confidence */}
            {summary.confidence && (
                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <SectionHeader
                        label="AI Assessment"
                        title="Confidence"
                    />

                    <div className="flex flex-col gap-5 rounded-2xl bg-slate-50 p-6 sm:flex-row sm:items-start">

                        <div className="shrink-0">

                            <span
                                className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                                    summary.confidence.level === "High"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : summary.confidence.level === "Medium"
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {summary.confidence.level || "Unknown"}
                            </span>

                        </div>

                        <p className="leading-7 text-slate-600">
                            {summary.confidence.reason ||
                                "No confidence explanation was provided."}
                        </p>

                    </div>

                </section>
            )}

        </div>
    );
}