"use client";

import type { AISummary } from "@/context/AISummaryContext";

type Props = {
    summary: AISummary;
};

function normalize(text: string) {
    return text.trim().toLowerCase().replace(/[.\s]+$/g, "");
}

function Section({
    label,
    title,
    children,
}: {
    label: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="border-t border-slate-200 py-8 first:border-t-0">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <h2 className="mt-1 text-2xl font-semibold">{title}</h2>

            <div className="mt-5">{children}</div>
        </section>
    );
}

function ItemList({
    items,
    empty,
    numbered = false,
}: {
    items?: string[];
    empty: string;
    numbered?: boolean;
}) {
    if (!items?.length) {
        return <p className="text-sm text-slate-500">{empty}</p>;
    }

    return (
        <div className="divide-y divide-slate-200 border-y border-slate-200">
            {items.map((item, index) => (
                <div key={index} className="flex gap-5 py-4">
                    {numbered && (
                        <span className="w-6 shrink-0 text-base font-medium tabular-nums text-slate-400">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    )}

                    <p className="text-base leading-7 text-slate-700">
                        {item}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default function ExecutiveReport({ summary }: Props) {
    // Opportunities and next actions are often word-for-word identical.
    // Only show opportunities that add something beyond the action list.
    const actionKeys = new Set(
        (summary.next_actions ?? []).map(normalize)
    );

    const distinctOpportunities = (summary.opportunities ?? []).filter(
        (item) => !actionKeys.has(normalize(item))
    );

    const level = summary.confidence?.level;

    return (
        <div>
            <Section
                label="Executive assessment"
                title="Overall business condition"
            >
                <p className="max-w-4xl text-lg leading-8 text-slate-700">
                    {summary.overall_condition ||
                        "No overall business condition was generated."}
                </p>
            </Section>

            <Section label="What the data says" title="Key findings">
                <ItemList
                    numbered
                    items={summary.key_findings}
                    empty="No key findings were generated."
                />
            </Section>

            <Section label="Risk assessment" title="Risks">
                <ItemList
                    items={summary.risks}
                    empty="No evidence-based risks were identified from the available data."
                />
            </Section>

            {distinctOpportunities.length > 0 && (
                <Section label="Growth potential" title="Opportunities">
                    <ItemList items={distinctOpportunities} empty="" />
                </Section>
            )}

            <Section label="Action plan" title="Next actions">
                <ItemList
                    numbered
                    items={summary.next_actions}
                    empty="No next actions were generated."
                />
            </Section>

            {summary.data_limitations?.length ? (
                <Section label="Data coverage" title="Data limitations">
                    <p className="mb-4 text-base text-slate-500">
                        These KPI categories were not available, which limits
                        the scope of the analysis.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {summary.data_limitations.map((item, index) => (
                            <span
                                key={index}
                                className="border border-slate-200 px-3 py-1.5 text-sm font-medium capitalize text-slate-700"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </Section>
            ) : null}

            {summary.confidence && (
                <Section label="AI assessment" title="Confidence">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <span className="inline-flex shrink-0 items-center gap-2 border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-900">
                            <span
                                className={`h-2 w-2 rounded-full ${
                                    level === "High"
                                        ? "bg-emerald-500"
                                        : level === "Medium"
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                }`}
                            />
                            {level ?? "Unknown"}
                        </span>

                        <p className="max-w-3xl text-base leading-7 text-slate-600">
                            {summary.confidence.reason ||
                                "No confidence explanation was provided."}
                        </p>
                    </div>
                </Section>
            )}
        </div>
    );
}