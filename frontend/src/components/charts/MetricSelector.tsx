"use client";

type MetricSelectorProps = {
    metrics: string[];
    selectedMetric: string;
    onMetricChange: (metric: string) => void;
};

function formatMetricName(metric: string) {
    return metric
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
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
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3">
                <p className="text-sm font-semibold text-slate-900">
                    Business Metrics
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    Select a metric to explore its visualizations.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {metrics.map((metric) => {
                    const active = metric === selectedMetric;

                    return (
                        <button
                            key={metric}
                            type="button"
                            onClick={() => onMetricChange(metric)}
                            aria-pressed={active}
                            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                active
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "border border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            {formatMetricName(metric)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}