"use client";

import GenericBarChart from "./chart/GenricBarChart";
import GenericPieChart from "./chart/GenricPieChart";
import GenericLineChart from "./chart/GenricLineChart";
import GenericAreaChart from "./chart/GenricAreaChart";
import ChartEmptyState from "./ChartEmptyState";

type FilterType =
    | "top5"
    | "top10"
    | "top20"
    | "all";

type ChartConfig = {
    data: any[];

    xKey?: string;
    yKey?: string;

    nameKey?: string;
    valueKey?: string;
};

type Metric = {
    labelKey?: string;
    valueKey?: string;

    charts: Record<string, ChartConfig>;
};

type Props = {
    metric: Metric;
    chartType: string;
    filter: FilterType;
    metricKey?: string;
};

function getFilteredData(
    data: any[],
    filter: FilterType
) {
    if (!Array.isArray(data)) {
        return [];
    }

    switch (filter) {
        case "top5":
            return data.slice(0, 5);

        case "top10":
            return data.slice(0, 10);

        case "top20":
            return data.slice(0, 20);

        case "all":
        default:
            return data;
    }
}

/*
 * These are the human-readable labels shown on chart axes.
 *
 * The data keys themselves may be things like:
 * "name", "value", "sales", "revenue", etc.
 *
 * We do not want those internal keys exposed directly
 * to the user.
 */
function getXAxisLabel(
    metricKey: string | undefined
) {
    switch (metricKey) {
        case "revenue":
        case "profit":
        case "cost":
        case "sales":
            return "Product";

        case "customer":
            return "Customer";

        case "product":
            return "Product";

        case "employees":
            return "Date";

        case "growth":
            return "Date";

        default:
            return "Category";
    }
}

function getYAxisLabel(
    metricKey: string | undefined
) {
    switch (metricKey) {
        case "revenue":
            return "Amount ($)";

        case "profit":
            return "Amount ($)";

        case "cost":
            return "Amount ($)";

        case "sales":
            return "Units sold";

        case "employees":
            return "Employees";

        case "customer":
            return "Customers";

        case "product":
            return "Products";

        case "growth":
            return "Growth (%)";

        default:
            return "Value";
    }
}

function SnapshotState() {
    return (
        <div className="border-y border-slate-200 bg-white py-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                <div className="max-w-2xl pl-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Snapshot metric
                    </p>

                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                        Employee counts are not product performance
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Employee counts represent workforce snapshots.
                        InsightPilot does not sum or rank these values by
                        product because that would create a misleading metric.
                    </p>
                </div>

                <div className="w-full border-l-2 border-slate-200 pl-4 lg:max-w-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Next analytical view
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Employee counts will be plotted against the detected
                        date field when time-series analysis is enabled.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default function ChartRenderer({
    metric,
    chartType,
    filter,
    metricKey,
}: Props) {
    /*
     * Employee counts are snapshot values.
     *
     * They must not be grouped by Product and summed because
     * the same workforce snapshot can appear across multiple
     * transaction rows.
     *
     * Time-based workforce visualization belongs to the
     * future date/trend analysis feature.
     */
    if (metricKey === "employees") {
        return <SnapshotState />;
    }

    if (!metric?.charts) {
        return null;
    }

    const chart = metric.charts[chartType];

    if (
        !chart ||
        !Array.isArray(chart.data)
    ) {
        return <ChartEmptyState />;
    }

    const filteredData = getFilteredData(
        chart.data,
        filter
    );

    if (!filteredData.length) {
        return <ChartEmptyState />;
    }

    const xAxisLabel = getXAxisLabel(metricKey);
    const yAxisLabel = getYAxisLabel(metricKey);

    if (chartType === "bar") {
        if (!chart.xKey || !chart.yKey) {
            return <ChartEmptyState />;
        }

        return (
            <div className="border border-slate-200 bg-white">
                <GenericBarChart
                    data={filteredData}
                    xKey={chart.xKey}
                    yKey={chart.yKey}
                    xAxisLabel={xAxisLabel}
                    yAxisLabel={yAxisLabel}
                />
            </div>
        );
    }

    if (chartType === "pie") {
        if (
            !chart.nameKey ||
            !chart.valueKey
        ) {
            return <ChartEmptyState />;
        }

        return (
            <div className="border border-slate-200 bg-white">
                <GenericPieChart
                    data={filteredData}
                    nameKey={chart.nameKey}
                    valueKey={chart.valueKey}
                />
            </div>
        );
    }

    if (chartType === "line") {
        if (!chart.xKey || !chart.yKey) {
            return <ChartEmptyState />;
        }

        return (
            <div className="border border-slate-200 bg-white">
                <GenericLineChart
                    data={filteredData}
                    xKey={chart.xKey}
                    yKey={chart.yKey}
                    xAxisLabel={xAxisLabel}
                    yAxisLabel={yAxisLabel}
                />
            </div>
        );
    }

    if (chartType === "area") {
        if (!chart.xKey || !chart.yKey) {
            return <ChartEmptyState />;
        }

        return (
            <div className="border border-slate-200 bg-white">
                <GenericAreaChart
                    data={filteredData}
                    xKey={chart.xKey}
                    yKey={chart.yKey}
                    xAxisLabel={xAxisLabel}
                    yAxisLabel={yAxisLabel}
                />
            </div>
        );
    }

    return <ChartEmptyState />;
}