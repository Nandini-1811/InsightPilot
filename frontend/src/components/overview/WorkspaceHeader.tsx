"use client";

type Props = {
  filename: string;
  rows: number;
  columns: number;
  health: {
    overall_score: number;
    status: string;
  };
  onReupload: () => void;
};

export default function WorkspaceHeader({
  filename,
  rows,
  columns,
  health,
  onReupload,
}: Props) {
  return (
    <section className="mb-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        {/* Left */}
        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Executive Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {filename}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Last analyzed • Just now
          </p>

        </div>

        {/* Right */}
        <div className="flex gap-3">

          <button
            onClick={onReupload}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Re-upload CSV
          </button>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">

        <MetricBox
          title="Rows"
          value={rows.toLocaleString()}
        />

        <MetricBox
          title="Columns"
          value={columns.toString()}
        />

        <MetricBox
          title="Health"
          value={health.status}
          valueColor="text-green-600"
        />

        <MetricBox
          title="Quality"
          value={`${health.overall_score}/100`}
          valueColor="text-blue-600"
        />

      </div>

      <div className="mt-10 border-b border-slate-200" />

    </section>
  );
}

type MetricBoxProps = {
  title: string;
  value: string;
  valueColor?: string;
};

function MetricBox({
  title,
  value,
  valueColor = "text-slate-900",
}: MetricBoxProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">

      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h3 className={`mt-2 text-3xl font-bold ${valueColor}`}>
        {value}
      </h3>

    </div>
  );
}