"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    LabelList,
} from "recharts";

type Props = {
    data: any[];
    nameKey: string;
    valueKey: string;
};

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f97316",
    "#9333ea",
    "#dc2626",
    "#0891b2",
    "#eab308",
    "#db2777",
    "#4f46e5",
    "#0d9488",
    "#ea580c",
    "#7c3aed",
];

function formatValue(value: number) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
    }).format(value);
}

function formatName(value: string) {
    const text = String(value);

    return text.length <= 18
        ? text
        : `${text.slice(0, 18)}...`;
}

export default function GenericPieChart({
    data,
    nameKey,
    valueKey,
}: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
                No data available.
            </div>
        );
    }

    const showLabels = data.length <= 10;

    const chartHeight =
        data.length <= 10
            ? 600
            : data.length <= 20
                ? 560
                : 620;

    return (
        <div className="border border-slate-200 bg-white">
            <div
                style={{
                    height: `${chartHeight}px`,
                }}
                className="w-full p-2"
            >
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={valueKey}
                            nameKey={nameKey}
                            cx="50%"
                            cy={
                                showLabels
                                    ? "45%"
                                    : "40%"
                            }
                            outerRadius={
                                data.length <= 10
                                    ? 175
                                    : data.length <= 20
                                        ? 160
                                        : 145
                            }
                            innerRadius={
                                data.length <= 10
                                    ? 65
                                    : data.length <= 20
                                        ? 60
                                        : 55
                            }
                            paddingAngle={
                                data.length <= 20
                                    ? 2
                                    : 1
                            }
                            label={
                                showLabels
                                    ? (props: any) =>
                                        formatName(
                                            String(
                                                props.name
                                            )
                                        )
                                    : false
                            }
                            labelLine={false}
                        >
                            {data.map(
                                (_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            COLORS[
                                                index %
                                                    COLORS.length
                                            ]
                                        }
                                    />
                                )
                            )}

                            {showLabels && (
                                <LabelList
                                    dataKey={valueKey}
                                    position="inside"
                                    formatter={(
                                        value: any
                                    ) =>
                                        formatValue(
                                            Number(value)
                                        )
                                    }
                                    fill="#ffffff"
                                    fontSize={14}
                                    fontWeight={700}
                                />
                            )}
                        </Pie>

                        <Tooltip
                            formatter={(
                                value: any
                            ) =>
                                formatValue(
                                    Number(value)
                                )
                            }
                        />

                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            wrapperStyle={{
                                maxHeight:
                                    data.length > 20
                                        ? 170
                                        : 120,
                                overflowY:
                                    data.length > 20
                                        ? "auto"
                                        : "visible",
                                paddingTop: 20,
                                fontSize: 12,
                            }}
                            formatter={(
                                value: string
                            ) =>
                                formatName(value)
                            }
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {data.length > 20 && (
                <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">
                        Large dataset:
                    </span>{" "}
                    {data.length} categories are shown.
                    Use Top 5 or Top 10 for easier
                    comparison.
                </div>
            )}
        </div>
    );
}