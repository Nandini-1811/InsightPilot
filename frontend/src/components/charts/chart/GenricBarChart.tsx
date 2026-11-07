"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type Props = {
    data: any[];
    xKey: string;
    yKey: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
};

function formatValue(value: unknown) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(number);
}

export default function GenericBarChart({
    data,
    xKey,
    yKey,
    xAxisLabel = "Category",
    yAxisLabel = "Value",
}: Props) {
    if (!data.length) {
        return (
            <div className="border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
                No data available.
            </div>
        );
    }

    return (
        <div className="border border-slate-200 bg-white">
            <div className="h-[400px] w-full px-5 pb-4 pt-3">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={data}
                        margin={{
                            top: 15,
                            right: 20,
                            left: 15,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey={xKey}
                            interval={0}
                            angle={-35}
                            textAnchor="end"
                            height={65}
                            tick={{
                                fontSize: 12,
                            }}
                            tickFormatter={(value) => {
                                const text =
                                    String(value);

                                return text.length > 14
                                    ? `${text.slice(0, 14)}...`
                                    : text;
                            }}
                            label={{
                                value: xAxisLabel,
                                position: "insideBottom",
                                offset: -35,
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12,
                            }}
                            tickFormatter={formatValue}
                            width={55}
                            label={{
                                value: yAxisLabel,
                                angle: -90,
                                position: "insideLeft",
                                offset: 5,
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            cursor={{
                                fill: "#f8fafc",
                            }}
                            formatter={(value: any) => [
                                formatValue(value),
                                yAxisLabel,
                            ]}
                        />

                        <Bar
                            dataKey={yKey}
                            fill="#2563eb"
                            radius={[3, 3, 0, 0]}
                            maxBarSize={64}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}