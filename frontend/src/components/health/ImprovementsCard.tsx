type Props = {
  quality: number;
  revenue?: number |null;
  growth?: number | null;
  employees?: number | null;
};

export default function ImprovementsCard({
  quality,
  revenue,
  growth,
  employees,
}: Props) {

  const improvements: string[] = [];

  if (quality < 95)
    improvements.push("Improve data quality by reducing missing values.");

  if (revenue == null)
    improvements.push("Revenue information is missing.");

  if (growth == null)
    improvements.push("Growth metrics are unavailable.");

  if (employees == null)
    improvements.push("Employee information is missing.");

  const hasIssues = improvements.length > 0;

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm ${
        hasIssues
          ? "border border-amber-200 bg-white"
          : "border border-green-200 bg-white"
      }`}
    >

      <div className="flex items-center gap-3">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${
            hasIssues
              ? "bg-amber-100"
              : "bg-green-100"
          }`}
        >
          {hasIssues ? "⚠️" : "🎉"}
        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Areas to Improve
          </h2>

          <p className="text-sm text-slate-500">
            Potential risks and opportunities.
          </p>

        </div>

      </div>

      {hasIssues ? (

        <div className="mt-8 space-y-4">

          {improvements.map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl bg-amber-50 p-4"
            >

              <div className="mt-1 text-lg text-amber-600">
                ⚠
              </div>

              <p className="leading-7 text-slate-700">
                {item}
              </p>

            </div>

          ))}

        </div>

      ) : (

        <div className="mt-8 rounded-2xl bg-green-50 p-8 text-center">

          <div className="text-5xl">
            🎉
          </div>

          <h3 className="mt-4 text-xl font-bold text-green-700">
            No major issues detected
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            Your dataset appears complete and ready for advanced
            business analysis. No critical risks were identified.
          </p>

        </div>

      )}

    </div>
  );
}