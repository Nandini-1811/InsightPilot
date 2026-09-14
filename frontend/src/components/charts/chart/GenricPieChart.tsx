"use client";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
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
    "#0284c7",
    "#65a30d",
    "#c026d3",
    "#475569",
    "#059669",
    "#b91c1c",
    "#ca8a04",
    "#6d28d9",
];

function formatValue(value: number) {
    return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
    }).format(value);
}

function formatName(value: string) {
    const text = String(value);

    if (text.length <= 22) {
        return text;
    }

    return `${text.slice(0, 22)}...`;
}

export default function GenericPieChart({
    data,
    nameKey,
    valueKey,
}: Props) {
    if (!data || data.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
                No data available.
            </div>
        );
    }

    /*
     * Labels become unreadable when there are many
     * slices. Keep them for small datasets only.
     */
    const showLabels = data.length <= 10;

    /*
     * Larger datasets need more vertical space because
     * their legend can contain many items.
     */
    const chartHeight =
        data.length <= 10
            ? 520
            : data.length <= 20
                ? 580
                : 650;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div
                style={{ height: `${chartHeight}px` }}
                className="w-full"
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
                            cy={showLabels ? "43%" : "40%"}
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
                            paddingAngle={data.length <= 20 ? 2 : 1}
                            label={
                                showLabels
                                    ? (props: any) =>
                                        formatName(
                                            String(props.name)
                                        )
                                    : false
                            }
                            labelLine={showLabels}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        COLORS[
                                            index %
                                            COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value: any) =>
                                formatValue(Number(value))
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
                            formatter={(value: string) =>
                                formatName(value)
                            }
                        />

                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Helpful explanation for large datasets */}
            {data.length > 20 && (
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-600">
                    <span className="font-semibold text-blue-700">
                        Large dataset:
                    </span>{" "}
                    The pie chart contains {data.length} categories.
                    Use Top 5 or Top 10 for easier comparison.
                    You can still view every category in the legend.
                </div>
            )}

        </div>
    );
}