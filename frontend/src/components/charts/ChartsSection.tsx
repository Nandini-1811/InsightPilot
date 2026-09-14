"use client";

import { useEffect, useMemo, useState } from "react";

import MetricSelector from "./MetricSelector";
import ChartSummary from "./ChartSummary";
import ChartToolbar from "./ChartToolbar";
import ChartRenderer from "./ChartRender";

type FilterType = "top5" | "top10" | "top20" | "all";

type Props = {
    charts: Record<string, any>;
};

export default function ChartsSection({
    charts,
}: Props) {
    const metricKeys = useMemo(
        () => Object.keys(charts || {}),
        [charts]
    );

    const [selectedMetric, setSelectedMetric] =
        useState<string>("");

    const [selectedChart, setSelectedChart] =
        useState<string>("bar");

    const [selectedFilter, setSelectedFilter] =
        useState<FilterType>("top10");

    /*
     * Select the first available KPI when
     * chart data becomes available.
     */
    useEffect(() => {
        if (metricKeys.length === 0) {
            setSelectedMetric("");
            return;
        }

        if (!selectedMetric || !charts[selectedMetric]) {
            setSelectedMetric(metricKeys[0]);
        }
    }, [metricKeys, selectedMetric, charts]);

    const currentMetric = selectedMetric
        ? charts[selectedMetric]
        : null;
    
    /*
     * Reset chart type and filter whenever
     * the selected KPI changes.
     */
    useEffect(() => {
        if (!currentMetric) return;

        const defaultChart =
            currentMetric.defaultChart ||
            currentMetric.defaultType ||
            currentMetric.availableCharts?.[0] ||
            "bar";

        const defaultFilter =
            currentMetric.defaultFilter || "top10";

        setSelectedChart(defaultChart);
        setSelectedFilter(defaultFilter);
    }, [selectedMetric, currentMetric]);

    if (!currentMetric) {
        return null;
    }

    const availableCharts =
        currentMetric.availableCharts ||
        currentMetric.chartTypes ||
        Object.keys(currentMetric.charts || {});

    return (
        <section className="space-y-8">

            {/* KPI Selector */}

            <MetricSelector
                metrics={metricKeys}
                selectedMetric={selectedMetric}
                onMetricChange={setSelectedMetric}
            />

            {/* Selected KPI Summary */}

            <ChartSummary
                title={currentMetric.title}
                summary={currentMetric.summary}
            />

            {/* Chart Controls */}

            <ChartToolbar
                availableCharts={availableCharts}
                selectedChart={selectedChart}
                onChartChange={setSelectedChart}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
            />

            {/* Chart */}

            <ChartRenderer
                metric={currentMetric}
                chartType={selectedChart}
                filter={selectedFilter}
            />

        </section>
    );
}