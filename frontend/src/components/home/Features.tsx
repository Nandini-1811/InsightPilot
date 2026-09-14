import {
  LayoutDashboard,
  Brain,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    title: "Interactive Dashboard",
    description:
      "Visualize revenue, growth, KPIs and business trends with beautiful charts.",
    icon: LayoutDashboard,
  },
  {
    title: "AI Business Summary",
    description:
      "Receive intelligent insights and recommendations generated from your data.",
    icon: Brain,
  },
  {
    title: "Business Health Score",
    description:
      "Instantly evaluate data quality and business performance with a unified score.",
    icon: ShieldCheck,
  },
  {
    title: "AI Chat Assistant",
    description:
      "Ask questions in natural language and get answers directly from your dataset.",
    icon: MessageSquare,
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center">
        <p className="text-blue-600 font-semibold uppercase tracking-wider">
          Features
        </p>

        <h2 className="mt-3 text-5xl font-bold text-slate-900">
          Everything you need to understand your business
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
          InsightPilot transforms raw CSV files into meaningful dashboards,
          AI-powered insights and interactive analytics in seconds.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Icon className="h-7 w-7 text-blue-600" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}