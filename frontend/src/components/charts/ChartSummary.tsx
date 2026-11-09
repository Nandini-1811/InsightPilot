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

    max?: number;
    min?: number;

    records: number;
    topPerformer?: string;
    unit?: "currency" | "number" | "percentage";
};

type Props = {
    title: string;
    summary: Summary;
    metricKey?: string;
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

function SummaryItem({
    label,
    value,
    description,
}: {
    label: string;
    value: string;
    description?: string;
}) {
    return (
        <div className="min-w-0 border-l border-slate-200 pl-5 first:border-l-0 first:pl-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p
                className="mt-2 truncate text-2xl font-semibold tracking-tight text-slate-950"
                title={value}
            >
                {value}
            </p>

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
    metricKey,
}: Props) {
    const highestValue =
        summary.highest?.value ??
        summary.max;

    const lowestValue =
        summary.lowest?.value ??
        summary.min;

    const highestName =
        summary.highest?.name;

    const lowestName =
        summary.lowest?.name;

    const isSnapshotMetric =
        metricKey === "employees";

    return (
        <section className="border-b border-slate-200 pb-7">

            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Metric
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {title}
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {isSnapshotMetric
                        ? "Snapshot statistics for the selected metric."
                        : "Summary statistics for the selected business metric."}
                </p>
            </div>

            <div className="grid gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                <SummaryItem
                    label="Total"
                    value={formatValue(
                        summary.total,
                        summary.unit
                    )}
                />

                <SummaryItem
                    label="Average"
                    value={formatValue(
                        summary.average,
                        summary.unit
                    )}
                />

                <SummaryItem
                    label={
                        isSnapshotMetric
                            ? "Highest snapshot"
                            : "Highest value"
                    }
                    value={formatValue(
                        highestValue,
                        summary.unit
                    )}
                    description={
                        !isSnapshotMetric
                            ? highestName
                            : undefined
                    }
                />

                <SummaryItem
                    label={
                        isSnapshotMetric
                            ? "Lowest snapshot"
                            : "Lowest value"
                    }
                    value={formatValue(
                        lowestValue,
                        summary.unit
                    )}
                    description={
                        !isSnapshotMetric
                            ? lowestName
                            : undefined
                    }
                />

                <SummaryItem
                    label="Records"
                    value={summary.records.toLocaleString()}
                />

            </div>

        </section>
    );
}