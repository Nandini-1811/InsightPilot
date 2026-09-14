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

export default function ChartToolbar({
    availableCharts,
    selectedChart,
    onChartChange,
    selectedFilter,
    onFilterChange,
}: Props) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Chart Types */}

            <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm font-semibold text-slate-600">
                    Chart
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
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                active
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            {chartLabels[chart] ??
                                chart
                                    .charAt(0)
                                    .toUpperCase() +
                                    chart.slice(1)}
                        </button>
                    );
                })}
            </div>

            {/* Data Filter */}

            <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm font-semibold text-slate-600">
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
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                active
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            {filter.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}