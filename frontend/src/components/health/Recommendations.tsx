type Recommendation = {
  priority: string;
  area: string;
  message: string;
};

type Props = {
  recommendations?: Recommendation[];
};

export default function Recommendations({
  recommendations = [],
}: Props) {
  const items =
    recommendations.length > 0
      ? recommendations
      : [
          {
            priority: "Info",
            area: "General",
            message:
              "Continue monitoring your business metrics regularly.",
          },
          {
            priority: "Info",
            area: "Analysis",
            message:
              "Upload updated datasets to compare performance over time.",
          },
          {
            priority: "Info",
            area: "Planning",
            message:
              "Review revenue and growth trends for strategic planning.",
          },
        ];

  return (
    <section className="mb-8">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
            💡
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              AI Recommendations
            </h2>

            <p className="mt-1 text-slate-500">
              Actionable suggestions generated from your business data.
            </p>

          </div>

        </div>

        <div className="mt-8 space-y-6">

          {items.map((item, index) => {
            const priority =
              item.priority.charAt(0).toUpperCase() +
              item.priority.slice(1);

            const area =
              item.area.charAt(0).toUpperCase() +
              item.area.slice(1);

            const priorityStyle =
              priority === "High"
                ? "bg-red-100 text-red-700"
                : priority === "Medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700";

            return (
              <div
                key={index}
                className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-center justify-between">

                  <span
                    className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${priorityStyle}`}
                  >
                    {priority} Priority
                  </span>

                  <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-700">
                    {area}
                  </span>

                </div>

                <p className="mt-5 leading-8 text-slate-700">
                  {item.message}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}