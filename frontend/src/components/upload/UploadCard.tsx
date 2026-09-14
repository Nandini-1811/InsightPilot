"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadCSV } from "@/services/api";

type Props = {
  embedded?: boolean;
  onSuccess?: (analysis: any) => void;
};

export default function UploadCard({
  embedded = false,
  onSuccess,
}: Props) {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleBrowse() {
    inputRef.current?.click();
  }

  async function handleAnalyze() {
    if (!file) return;

    try {
      setLoading(true);

      const result = await uploadCSV(file);

      /*
       * Store the complete analysis response.
       *
       * This includes:
       * - analysis_id
       * - filename
       * - business health
       * - business analysis
       * - insights
       * - recommendations
       * - charts
       * - dashboard
       * - etc.
       */
      sessionStorage.setItem(
        "analysis",
        JSON.stringify(result)
      );

      /*
       * Store analysis_id separately because the AI Summary
       * page will use it to fetch:
       *
       * GET /ai/summary/{analysis_id}
       */
      if (result.analysis_id) {
        sessionStorage.setItem(
          "analysis_id",
          result.analysis_id
        );
      }

      if (onSuccess) {
        onSuccess(result);
        setFile(null);
      } else {
        router.push("/overview");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id={!embedded ? "upload" : undefined}
      className={embedded ? "" : "pt-10 pb-24"}
    >
      <div
        className={`mx-auto ${
          embedded ? "max-w-full" : "max-w-3xl px-6"
        }`}
      >
        <div
          className={`rounded-3xl border border-slate-200 bg-white shadow-xl ${
            embedded ? "p-8" : "p-10"
          }`}
        >
          <h2
            className={`font-bold text-slate-900 ${
              embedded
                ? "text-2xl"
                : "text-center text-3xl"
            }`}
          >
            {embedded
              ? "Upload New Dataset"
              : "Upload Your Business Data"}
          </h2>

          {!embedded && (
            <p className="mt-3 text-center text-slate-600">
              Upload a CSV file and instantly receive dashboards,
              business health analysis, charts, recommendations
              and an AI-generated executive summary.
            </p>
          )}

          <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 text-center transition hover:border-blue-500">
            <div className="text-5xl">
              📄
            </div>

            <p className="mt-4 text-lg font-semibold text-slate-800">
              Drag & Drop your CSV here
            </p>

            <p className="mt-2 text-slate-500">
              or browse from your computer
            </p>

            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              hidden
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
              }}
            />

            <button
              type="button"
              onClick={handleBrowse}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Files
            </button>

            {file && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
                <p className="font-medium text-green-700">
                  {file.name}
                </p>

                <p className="mt-1 text-sm text-green-600">
                  Ready for analysis
                </p>
              </div>
            )}

            <p className="mt-6 text-sm text-slate-500">
              Supported format: CSV • Maximum size: 10 MB
            </p>
          </div>

          <button
            type="button"
            disabled={!file || loading}
            onClick={handleAnalyze}
            className="mt-8 w-full rounded-xl bg-slate-900 py-4 text-lg font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Analyzing..."
              : embedded
              ? "Analyze New Dataset"
              : "Analyze Business"}
          </button>
        </div>
      </div>
    </section>
  );
}