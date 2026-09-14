"use client";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type Props = {
    data: any[];
    xKey: string;
    yKey: string;
};

function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);
}

function formatLabel(value: unknown) {
    const text = String(value);

    return text.length > 14
        ? `${text.slice(0, 14)}...`
        : text;
}

export default function GenericAreaChart({
    data,
    xKey,
    yKey,
}: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
                No data available.
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="h-[520px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 25,
                            left: 10,
                            bottom: 100,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey={xKey}
                            interval={0}
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            tick={{
                                fontSize: 12,
                            }}
                            tickFormatter={formatLabel}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12,
                            }}
                            tickFormatter={formatNumber}
                        />

                        <Tooltip
                            cursor={{
                                strokeDasharray: "4 4",
                            }}
                            formatter={(value: any) => [
                                formatNumber(Number(value)),
                                "Value",
                            ]}
                            labelFormatter={(label) =>
                                String(label)
                            }
                        />

                        <Area
                            type="monotone"
                            dataKey={yKey}
                            stroke="#16a34a"
                            fill="#86efac"
                            fillOpacity={0.35}
                            strokeWidth={3}
                            activeDot={{
                                r: 7,
                            }}
                            connectNulls
                        />

                    </AreaChart>
                </ResponsiveContainer>

            </div>

        </div>
    );
}