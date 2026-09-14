"use client";

export default function CTA() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[32px] bg-gradient-to-r from-blue-600 to-indigo-700 p-14 text-center text-white shadow-2xl">

          <h2 className="text-5xl font-bold">
            Ready to Understand Your Business?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Upload your CSV and let InsightPilot generate dashboards,
            AI insights, business health scores and recommendations in seconds.
          </p>

          <a
            href="#upload"
            className="mt-10 inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition hover:scale-105"
          >
            Upload Your First CSV
          </a>

        </div>
      </div>
    </section>
  );
}