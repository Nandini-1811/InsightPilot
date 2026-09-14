type Props = {
  revenue: number | null;
  employees: number | null;
  growth: number | null;
  quality: number | null;
};

function formatValue(
  value: number | null,
  type: "currency" | "number" | "percentage"
) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  switch (type) {
    case "currency":
      return `$${Math.round(value).toLocaleString()}`;

    case "percentage":
      return `${value.toFixed(2)}%`;

    default:
      return Math.round(value).toLocaleString();
  }
}

export default function KPICards({
  revenue,
  employees,
  growth,
  quality,
}: Props) {
  const cards = [
    {
      title: "Revenue",
      value: formatValue(revenue, "currency"),
      subtitle: "Total Revenue",
      accent: "bg-green-500",
    },
    {
      title: "Employees",
      value: formatValue(employees, "number"),
      subtitle: "Average Employees",
      accent: "bg-blue-500",
    },
    {
      title: "Growth",
      value: formatValue(growth, "percentage"),
      subtitle: "Average Growth",
      accent: "bg-purple-500",
    },
    {
      title: "Data Quality",
      value: formatValue(quality, "percentage"),
      subtitle: "Quality Score",
      accent: "bg-orange-500",
    },
  ];

  return (
    <section className="mb-8">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Key Business Metrics
        </h2>

        <p className="mt-1 text-slate-500">
          Important KPIs extracted from your uploaded dataset.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`mb-5 h-2 w-16 rounded-full ${card.accent}`}
            />

            <p className="text-sm font-medium text-slate-500">
              {card.title}
            </p>

            <h3 className="mt-3 text-4xl font-bold text-slate-900">
              {card.value}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}