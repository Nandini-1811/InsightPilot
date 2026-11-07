"use client";

type FilterType =
    | "top5"
    | "top10"
    | "top20"
    | "all";

type Props = {
    availableCharts: string[];
    selectedChart: string;
    onChartChange: (chart: string) => void;

    selectedFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
};

const filters: {
    id: FilterType;
    label: string;
}[] = [
    {
        id: "top5",
        label: "Top 5",
    },
    {
        id: "top10",
        label: "Top 10",
    },
    {
        id: "top20",
        label: "Top 20",
    },
    {
        id: "all",
        label: "All",
    },
];

const chartLabels: Record<string, string> = {
    bar: "Bar",
    line: "Line",
    area: "Area",
    pie: "Pie",
};

function formatChartName(chart: string) {
    return (
        chartLabels[chart] ??
        chart.charAt(0).toUpperCase() +
            chart.slice(1)
    );
}

export default function ChartToolbar({
    availableCharts,
    selectedChart,
    onChartChange,
    selectedFilter,
    onFilterChange,
}: Props) {
    return (
        <section className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap items-center gap-1">
                <span className="mr-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Chart type
                </span>

                {availableCharts.map((chart) => {
                    const active =
                        selectedChart === chart;

                    return (
                        <button
                            key={chart}
                            type="button"
                            onClick={() =>
                                onChartChange(chart)
                            }
                            aria-pressed={active}
                            className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                                active
                                    ? "border-slate-900 text-slate-950"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                            }`}
                        >
                            {formatChartName(chart)}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center gap-1">
                <span className="mr-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Show
                </span>

                {filters.map((filter) => {
                    const active =
                        selectedFilter === filter.id;

                    return (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() =>
                                onFilterChange(filter.id)
                            }
                            aria-pressed={active}
                            className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                                active
                                    ? "border-slate-900 text-slate-950"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                            }`}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>

        </section>
    );
}