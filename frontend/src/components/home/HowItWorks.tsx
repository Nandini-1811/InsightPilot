const steps = [
    {
        number: "01",
        title: "Upload",
        description:
            "Import a CSV containing the business data you want to understand.",
    },
    {
        number: "02",
        title: "Validate",
        description:
            "InsightPilot cleans the dataset and determines which analysis capabilities are supported.",
    },
    {
        number: "03",
        title: "Explore",
        description:
            "Review metrics, charts, readiness information and AI-assisted insights in one workspace.",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="border-b border-slate-200 bg-white py-20"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        How it works
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                        From raw CSV to an analysis workspace
                    </h2>

                    <p className="mt-4 text-base leading-7 text-slate-500">
                        InsightPilot separates data preparation from
                        analysis so you can see what the system knows,
                        what it can calculate, and what still needs data.
                    </p>
                </div>

                <div className="mt-12 grid gap-0 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`border-t border-slate-200 px-0 py-7 md:px-8 ${
                                index > 0
                                    ? "md:border-l"
                                    : ""
                            }`}
                        >
                            <p className="text-sm font-semibold text-slate-400">
                                {step.number}
                            </p>

                            <h3 className="mt-4 text-xl font-semibold text-slate-950">
                                {step.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}