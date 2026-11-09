"use client";

type MetricSelectorProps = {
    metrics: string[];
    selectedMetric: string;
    onMetricChange: (metric: string) => void;
};

function formatMetricName(metric: string) {
    return metric
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );
}

export default function MetricSelector({
    metrics,
    selectedMetric,
    onMetricChange,
}: MetricSelectorProps) {
    if (!metrics.length) {
        return null;
    }

    return (
        <section className="border-y border-slate-200 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <p className="text-sm font-semibold text-slate-900">
                        Business metrics
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Select a metric to explore its visualizations.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                    {metrics.map((metric) => {
                        const active =
                            metric === selectedMetric;

                        return (
                            <button
                                key={metric}
                                type="button"
                                onClick={() =>
                                    onMetricChange(metric)
                                }
                                aria-pressed={active}
                                className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                                    active
                                        ? "border-slate-900 text-slate-950"
                                        : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                                }`}
                            >
                                {formatMetricName(metric)}
                            </button>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}