"use client";

type Insight = {
    type?: "success" | "warning" | "error" | "info";
    title: string;
    message: string;
};

type Props = {
    insights: Insight[];
};

function getInsightStyles(type?: Insight["type"]) {
    switch (type) {
        case "warning":
            return {
                icon: "!",
                iconClass: "bg-amber-100 text-amber-700",
            };

        case "error":
            return {
                icon: "×",
                iconClass: "bg-red-100 text-red-700",
            };

        case "info":
            return {
                icon: "i",
                iconClass: "bg-blue-100 text-blue-700",
            };

        case "success":
        default:
            return {
                icon: "✓",
                iconClass: "bg-emerald-100 text-emerald-700",
            };
    }
}

export default function InsightsList({
    insights,
}: Props) {
    if (!insights || insights.length === 0) {
        return (
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Key Insights
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Important observations generated from your business data.
                    </p>
                </div>

                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                    <p className="font-medium text-slate-700">
                        No insights available
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Upload a dataset with analyzable business metrics to
                        generate insights.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Analysis
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Key Insights
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Important observations identified from your uploaded data.
                </p>
            </div>

            <div className="space-y-4">
                {insights.map((insight, index) => {
                    const styles = getInsightStyles(insight.type);

                    return (
                        <article
                            key={`${insight.title}-${index}`}
                            className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:border-slate-200 hover:bg-white"
                        >
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${styles.iconClass}`}
                            >
                                {styles.icon}
                            </div>

                            <div className="min-w-0">
                                <h3 className="font-semibold text-slate-900">
                                    {insight.title}
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {insight.message}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

        </section>
    );
}