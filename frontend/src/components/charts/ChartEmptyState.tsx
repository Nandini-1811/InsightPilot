"use client";

import { BarChart3 } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
};

export default function ChartEmptyState({
  title = "No Chart Available",
  description = "This business metric doesn't have enough data to generate this visualization.",
}: Props) {
  return (
    <div className="flex h-[520px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

        <BarChart3 className="h-8 w-8 text-blue-600" />

      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}