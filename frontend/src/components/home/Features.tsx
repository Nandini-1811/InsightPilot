import {
    LayoutDashboard,
    Brain,
    ShieldCheck,
    MessageSquare,
} from "lucide-react";

const features = [
    {
        title: "Analytics workspace",
        description:
            "Move from data quality and readiness into business performance, charts and deeper analysis.",
        icon: LayoutDashboard,
    },
    {
        title: "Explainable insights",
        description:
            "Use deterministic metrics as the foundation for AI-assisted interpretation.",
        icon: Brain,
    },
    {
        title: "Data-aware analysis",
        description:
            "InsightPilot distinguishes between supported, partial and unavailable analytical capabilities.",
        icon: ShieldCheck,
    },
    {
        title: "Ask questions",
        description:
            "Use the AI assistant to explore the information available in your analyzed dataset.",
        icon: MessageSquare,
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
        >
            <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Platform
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                    Everything organized around the data
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-500">
                    InsightPilot brings preparation, deterministic
                    analysis, visualization and AI interpretation into
                    one workflow.
                </p>
            </div>

            <div className="mt-12 grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={feature.title}
                            className="bg-white p-7 transition hover:bg-slate-50"
                        >
                            <Icon className="h-5 w-5 text-slate-500" />

                            <h3 className="mt-6 text-base font-semibold text-slate-950">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}