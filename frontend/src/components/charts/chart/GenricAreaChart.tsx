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
    xAxisLabel?: string;
    yAxisLabel?: string;
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
    xAxisLabel = "Category",
    yAxisLabel = "Value",
}: Props) {
    if (!data || data.length === 0) {
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
                    <AreaChart
                        data={data}
                        margin={{
                            top: 15,
                            right: 25,
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
                            tickFormatter={formatLabel}
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
                            tickFormatter={formatNumber}
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
                                strokeDasharray: "4 4",
                            }}
                            formatter={(value: any) => [
                                formatNumber(
                                    Number(value)
                                ),
                                yAxisLabel,
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
                            fillOpacity={0.28}
                            strokeWidth={2.5}
                            activeDot={{
                                r: 6,
                            }}
                            connectNulls
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}