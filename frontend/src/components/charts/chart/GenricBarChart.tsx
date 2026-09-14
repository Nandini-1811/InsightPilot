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
};

export default function GenericBarChart({
    data,
    xKey,
    yKey,
}: Props) {
    if (!data.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
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
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 10,
                            bottom: 110,
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
                            tickFormatter={(value) => {
                                const text = String(value);

                                return text.length > 14
                                    ? `${text.slice(0, 14)}...`
                                    : text;
                            }}
                        />

                        <YAxis
                            tick={{
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            cursor={{
                                fill: "#f1f5f9",
                            }}
                        />

                        <Bar
                            dataKey={yKey}
                            fill="#2563eb"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={60}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}