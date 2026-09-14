type Props = {
  quality: number;
  revenue?: number | null;
  growth?: number | null;
  employees?: number | null;
};

export default function HealthDimensions({
  quality,
  revenue,
  growth,
  employees,
}: Props) {
  return (
    <section className="mb-8">

      <div className="mb-6">

        <h2 className="text-3xl font-bold text-slate-900">
          Health Dimensions
        </h2>

        <p className="mt-2 text-slate-600">
          Breakdown of the key factors contributing to your overall business
          health.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DimensionCard
          title="Data Quality"
          value={`${quality}/100`}
          description="Completeness & consistency"
          color="blue"
        />

        <DimensionCard
          title="Revenue"
          value={
            revenue !== null && revenue !== undefined
              ? `$${Number(revenue).toLocaleString()}`
              : "N/A"
          }
          description="Total revenue detected"
          color="green"
        />

        <DimensionCard
          title="Growth"
          value={
            growth !== null && growth !== undefined
              ? `${Number(growth).toFixed(2)}%`
              : "N/A"
          }
          description="Average growth"
          color="amber"
        />

        <DimensionCard
          title="Employees"
          value={
            employees !== null && employees !== undefined
              ? Number(employees).toLocaleString()
              : "N/A"
          }
          description="Average workforce"
          color="purple"
        />

      </div>

    </section>
  );
}

type CardProps = {
  title: string;
  value: string;
  description: string;
  color: "blue" | "green" | "amber" | "purple";
};

function DimensionCard({
  title,
  value,
  description,
  color,
}: CardProps) {
  const topBar = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
  }[color];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className={`h-1 ${topBar}`} />

      <div className="p-6">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <h3 className="mt-3 text-3xl font-bold text-slate-900">
          {value}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}