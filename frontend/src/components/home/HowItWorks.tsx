const steps = [
  {
    number: "01",
    title: "Upload CSV",
    description:
      "Import your business data with a single click.",
  },
  {
    number: "02",
    title: "AI Processing",
    description:
      "InsightPilot cleans, validates and analyzes your dataset.",
  },
  {
    number: "03",
    title: "Get Insights",
    description:
      "Receive dashboards, recommendations and AI summaries instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">

        <h2 className="text-center text-4xl font-bold text-slate-900">
          How It Works
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          Three simple steps to transform raw business data into actionable insights.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl font-extrabold text-blue-600">
                {step.number}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}