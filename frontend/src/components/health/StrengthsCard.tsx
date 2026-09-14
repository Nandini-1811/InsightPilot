type Props = {
  quality: number;
  revenue?: number | null;
  growth?: number | null;
};

export default function StrengthsCard({
  quality,
  revenue,
  growth,
}: Props) {
  const strengths: string[] = [];

  if (quality >= 95)
    strengths.push("Excellent data quality with minimal missing values.");

  if (revenue != null)
    strengths.push("Revenue metrics are available for comprehensive analysis.");

  if (typeof growth === "number" && growth > 0)
    strengths.push("Positive business growth has been detected.");

  if (strengths.length === 0)
    strengths.push("Business metrics are available for further analysis.");

  return (
    <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl">
          ✅
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Strengths
          </h2>

          <p className="text-sm text-slate-500">
            Areas where your business is performing well.
          </p>
        </div>

      </div>

      <div className="mt-8 space-y-4">

        {strengths.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl bg-green-50 p-4"
          >
            <div className="mt-1 text-lg text-green-600">
              ✓
            </div>

            <p className="leading-7 text-slate-700">
              {item}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}