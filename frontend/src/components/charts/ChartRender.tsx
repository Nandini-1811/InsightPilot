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

export default function ChartRenderer({
    metric,
    chartType,
    filter,
}: Props) {
    if (!metric?.charts) {
        return null;
    }

    const chart = metric.charts[chartType];

    if (!chart || !Array.isArray(chart.data)) {
        return <ChartEmptyState />;
    }

    const filteredData = getFilteredData(
        chart.data,
        filter
    );

    if (!filteredData.length) {
        return <ChartEmptyState />;
    }

    /*
     * BAR
     */
    if (chartType === "bar") {
        if (!chart.xKey || !chart.yKey) {
            return <ChartEmptyState />;
        }

        return (
            <GenericBarChart
                data={filteredData}
                xKey={chart.xKey}
                yKey={chart.yKey}
            />
        );
    }

    /*
     * PIE
     */
    if (chartType === "pie") {
        if (!chart.nameKey || !chart.valueKey) {
            return <ChartEmptyState />;
        }

        return (
            <GenericPieChart
                data={filteredData}
                nameKey={chart.nameKey}
                valueKey={chart.valueKey}
            />
        );
    }

    /*
     * LINE
     */
    if (chartType === "line") {
        if (!chart.xKey || !chart.yKey) {
            return <ChartEmptyState />;
        }

        return (
            <GenericLineChart
                data={filteredData}
                xKey={chart.xKey}
                yKey={chart.yKey}
            />
        );
    }

    /*
     * AREA
     */
    if (chartType === "area") {
        if (!chart.xKey || !chart.yKey) {
            return <ChartEmptyState />;
        }

        return (
            <GenericAreaChart
                data={filteredData}
                xKey={chart.xKey}
                yKey={chart.yKey}
            />
        );
    }

    return <ChartEmptyState />;
}