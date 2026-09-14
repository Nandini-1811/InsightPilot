type Props = {
  score: number;
  status: string;
};

export default function HealthScore({
  score,
  status,
}: Props) {
  const progressColor =
    score >= 80
      ? "bg-green-500"
      : score >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <section className="mb-8">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Overall Business Health
        </p>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-6xl font-bold text-slate-900">
              {score}
              <span className="text-3xl text-slate-500">/100</span>
            </h2>

            <span
              className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                score >= 80
                  ? "bg-green-100 text-green-700"
                  : score >= 60
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status}
            </span>

            <p className="mt-6 max-w-xl leading-7 text-slate-600">
              This score summarizes your dataset's overall health
              based on data quality, business metrics and analysis
              readiness.
            </p>

          </div>

          <div className="w-full max-w-md">

            <div className="mb-3 flex justify-between text-sm font-medium text-slate-600">
              <span>Health Score</span>
              <span>{score}%</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`h-full rounded-full ${progressColor} transition-all duration-700`}
                style={{ width: `${score}%` }}
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}