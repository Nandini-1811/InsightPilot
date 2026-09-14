"use client";

type Recommendation = {
    priority?: "high" | "medium" | "low";
    area?: string;
    message: string;
};

type Props = {
    recommendations: Recommendation[];
};

function getPriorityStyles(priority?: Recommendation["priority"]) {
    switch (priority) {
        case "high":
            return {
                label: "High Priority",
                className: "bg-red-100 text-red-700",
            };

        case "medium":
            return {
                label: "Medium Priority",
                className: "bg-amber-100 text-amber-700",
            };

        case "low":
            return {
                label: "Low Priority",
                className: "bg-emerald-100 text-emerald-700",
            };

        default:
            return {
                label: "Recommended",
                className: "bg-blue-100 text-blue-700",
            };
    }
}

export default function Recommendations({
    recommendations,
}: Props) {
    if (!recommendations || recommendations.length === 0) {
        return (
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Recommendations
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Suggested actions based on your business analysis.
                    </p>
                </div>

                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                    <p className="font-medium text-slate-700">
                        No recommendations available
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Recommendations will appear when actionable patterns
                        are identified in your data.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Action Plan
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Recommendations
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Practical actions suggested from your business analysis.
                </p>
            </div>

            <div className="space-y-4">
                {recommendations.map((recommendation, index) => {
                    const priority = getPriorityStyles(
                        recommendation.priority
                    );

                    return (
                        <article
                            key={`${recommendation.message}-${index}`}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:border-slate-200 hover:bg-white"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                                <div>
                                    {recommendation.area && (
                                        <p className="text-sm font-semibold text-blue-600">
                                            {recommendation.area}
                                        </p>
                                    )}

                                    <p className="mt-1 text-sm leading-6 text-slate-700">
                                        {recommendation.message}
                                    </p>
                                </div>

                                <span
                                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${priority.className}`}
                                >
                                    {priority.label}
                                </span>

                            </div>
                        </article>
                    );
                })}
            </div>

        </section>
    );
}