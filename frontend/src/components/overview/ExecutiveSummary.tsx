type Insight = {
  title: string;
  message: string;
};

type Props = {
  filename: string;
  insights: Insight[];
};

export default function ExecutiveSummary({
  filename,
  insights,
}: Props) {
  return (
    <section className="mb-8">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              AI Executive Summary
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Overview of {filename}
            </h2>

          </div>

          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            AI Generated
          </div>

        </div>

        <div className="mt-8 space-y-5">

          {insights.map((insight, index) => (

            <div
              key={index}
              className="rounded-xl bg-slate-50 p-5"
            >
              <h3 className="font-semibold text-slate-900">
                {insight.title}
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {insight.message}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}