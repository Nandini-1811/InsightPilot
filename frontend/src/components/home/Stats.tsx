const stats = [
  {
    value: "<10s",
    label: "Analysis Time",
  },
  {
    value: "20+",
    label: "Business Metrics",
  },
  {
    value: "AI",
    label: "Powered Insights",
  },
  {
    value: "100%",
    label: "Secure Processing",
  },
];

export default function Stats() {
  return (
    <section className="py-18">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              {stat.value}
            </h2>

            <p className="mt-3 text-slate-600">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}