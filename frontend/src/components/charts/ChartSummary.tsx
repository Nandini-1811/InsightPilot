"use client";

type SummaryValue = {
    value: number;
    name?: string;
};

type Summary = {
    total: number;
    average: number;

    highest?: SummaryValue;
    lowest?: SummaryValue;

    // Backward compatibility in case an older response is used
    max?: number;
    min?: number;

    records: number;
    topPerformer?: string;
    unit?: "currency" | "number" | "percentage";
};

type Props = {
    title: string;
    summary: Summary;
};

function formatValue(
    value: number | undefined,
    unit: Summary["unit"]
) {
    if (
        value === undefined ||
        value === null ||
        !Number.isFinite(value)
    ) {
        return "—";
    }

    switch (unit) {
        case "currency":
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                notation: "compact",
                maximumFractionDigits: 1,
            }).format(value);

        case "percentage":
            return `${value.toFixed(2)}%`;

        default:
            return new Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
            }).format(value);
    }
}

function SummaryCard({
    label,
    value,
    description,
}: {
    label: string;
    value: string;
    description?: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
                {label}
            </p>

            <h3
                className="mt-2 truncate text-2xl font-bold text-slate-900"
                title={value}
            >
                {value}
            </h3>

            {description && (
                <p
                    className="mt-1 truncate text-xs text-slate-400"
                    title={description}
                >
                    {description}
                </p>
            )}
        </div>
    );
}

export default function ChartSummary({
    title,
    summary,
}: Props) {
    const highestValue =
        summary.highest?.value ?? summary.max;

    const lowestValue =
        summary.lowest?.value ?? summary.min;

    const highestName =
        summary.highest?.name;

    const lowestName =
        summary.lowest?.name;

    return (
        <section>

            {/* Heading */}

            <div className="mb-5">
                <h2 className="text-2xl font-bold text-slate-900">
                    {title} Overview
                </h2>

                <p className="mt-1 text-slate-500">
                    Summary statistics for the selected business metric.
                </p>
            </div>

            {/* Summary Cards */}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

                <SummaryCard
                    label="Total"
                    value={formatValue(
                        summary.total,
                        summary.unit
                    )}
                />

                <SummaryCard
                    label="Average"
                    value={formatValue(
                        summary.average,
                        summary.unit
                    )}
                />

                <SummaryCard
                    label="Highest Value"
                    value={formatValue(
                        highestValue,
                        summary.unit
                    )}
                    description={highestName}
                />

                <SummaryCard
                    label="Lowest Value"
                    value={formatValue(
                        lowestValue,
                        summary.unit
                    )}
                    description={lowestName}
                />

                <SummaryCard
                    label="Records"
                    value={summary.records.toLocaleString()}
                />

                {summary.topPerformer && (
                    <SummaryCard
                        label="Top Performer"
                        value={summary.topPerformer}
                    />
                )}

            </div>

        </section>
    );
}