"use client";

import { useEffect, useState } from "react";

import WorkspaceShell from "@/components/layout/WorkspaceShell";

type NumericStatistics = {
    total?: number;
    average?: number;
    maximum?: number;
    minimum?: number;
};

type DerivedMetric = {
    value?: number;
    formula?: string;
    numerator?: number;
    denominator?: number;
    revenue?: number;
    profit?: number;
    cost?: number;
};

type BusinessAnalysis = {
    revenue?: NumericStatistics;
    profit?: NumericStatistics;
    cost?: NumericStatistics;
    sales?: NumericStatistics;

    employees?: {
        average?: number;
        maximum?: number;
        minimum?: number;
    };

    customer?: {
        total_customers?: number;
        unique_customers?: number;
    };

    product?: {
        records?: number;
        unique_products?: number;
        duplicate_products?: number;
    };

    derived_metrics?: {
        profit_margin?: DerivedMetric;
        cost_revenue_ratio?: DerivedMetric;
        revenue_per_employee?: DerivedMetric;
        profit_per_employee?: DerivedMetric;
        revenue_per_customer?: DerivedMetric;
        revenue_per_product?: DerivedMetric;
    };
};

type Analysis = {
    business_analysis?: BusinessAnalysis;
};

function currency(value?: number) {
    if (value === undefined || value === null) {
        return "N/A";
    }

    return `$${value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    })}`;
}

function number(value?: number) {
    if (value === undefined || value === null) {
        return "N/A";
    }

    return value.toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });
}

function percent(value?: number) {
    if (value === undefined || value === null) {
        return "N/A";
    }

    return `${value.toFixed(2)}%`;
}

function PerformanceBlock({
    title,
    data,
    unit = "currency",
}: {
    title: string;
    data?: NumericStatistics;
    unit?: "currency" | "number";
}) {
    if (!data) {
        return null;
    }

    const format = unit === "currency" ? currency : number;

    return (
        <section className="border-t border-slate-200 py-8">
            <h2 className="text-xl font-semibold tracking-tight">
                {title}
            </h2>

            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <Metric
                    label="Total"
                    value={format(data.total)}
                />

                <Metric
                    label="Average"
                    value={format(data.average)}
                />

                <Metric
                    label="Maximum"
                    value={format(data.maximum)}
                />

                <Metric
                    label="Minimum"
                    value={format(data.minimum)}
                />
            </div>
        </section>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                {value}
            </p>
        </div>
    );
}

function DerivedMetricBlock({
    label,
    value,
    description,
    formula,
    unit = "currency",
}: {
    label: string;
    value?: number;
    description: string;
    formula?: string;
    unit?: "currency" | "percent" | "number";
}) {
    let formattedValue = "N/A";

    if (value !== undefined && value !== null) {
        if (unit === "percent") {
            formattedValue = percent(value);
        } else if (unit === "currency") {
            formattedValue = currency(value);
        } else {
            formattedValue = number(value);
        }
    }

    return (
        <div className="border-t border-slate-200 pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                {formattedValue}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>

            {formula && (
                <p className="mt-2 font-mono text-xs text-slate-400">
                    {formula}
                </p>
            )}
        </div>
    );
}

function SnapshotSection({
    employees,
}: {
    employees?: BusinessAnalysis["employees"];
}) {
    if (!employees) {
        return null;
    }

    return (
        <section className="border-t border-slate-200 py-8">
            <h2 className="text-xl font-semibold tracking-tight">
                Workforce
            </h2>

            <div className="mt-6 grid gap-8 sm:grid-cols-3">
                <Metric
                    label="Average employees"
                    value={number(employees.average)}
                />

                <Metric
                    label="Maximum employees"
                    value={number(employees.maximum)}
                />

                <Metric
                    label="Minimum employees"
                    value={number(employees.minimum)}
                />
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500">
                Employee counts are treated as snapshot-style values, so
                average workforce size is used for employee productivity
                calculations.
            </p>
        </section>
    );
}

function CustomerProductSection({
    customer,
    product,
}: {
    customer?: BusinessAnalysis["customer"];
    product?: BusinessAnalysis["product"];
}) {
    if (!customer && !product) {
        return null;
    }

    return (
        <section className="border-t border-slate-200 py-8">
            <h2 className="text-xl font-semibold tracking-tight">
                Customers & products
            </h2>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
                {customer && (
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Customers
                        </p>

                        <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                            {number(customer.unique_customers)}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Unique customers identified in the dataset.
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                            {number(customer.total_customers)} customer
                            records
                        </p>
                    </div>
                )}

                {product && (
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Products
                        </p>

                        <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                            {number(product.unique_products)}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Unique products identified in the dataset.
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                            {number(product.records)} product records
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default function PerformancePage() {
    const [analysis, setAnalysis] =
        useState<Analysis | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("analysis");

        if (!stored) {
            return;
        }

        try {
            setAnalysis(JSON.parse(stored));
        } catch {
            setAnalysis(null);
        }
    }, []);

    if (!analysis?.business_analysis) {
        return (
            <WorkspaceShell>
                <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Business
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        No dataset loaded
                    </h1>

                    <p className="mt-3 text-base leading-6 text-slate-500">
                        Upload a CSV from the home page to begin your
                        performance analysis.
                    </p>
                </div>
            </WorkspaceShell>
        );
    }

    const business = analysis.business_analysis;
    const derived = business.derived_metrics;

    return (
        <WorkspaceShell>
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

                <section className="border-b border-slate-200 pb-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Business
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        Performance
                    </h1>

                    <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
                        Deterministic business metrics calculated directly
                        from the uploaded dataset.
                    </p>
                </section>

                <PerformanceBlock
                    title="Revenue"
                    data={business.revenue}
                />

                <PerformanceBlock
                    title="Profit"
                    data={business.profit}
                />

                <PerformanceBlock
                    title="Cost"
                    data={business.cost}
                />

                {business.sales && (
                    <PerformanceBlock
                        title="Sales"
                        data={business.sales}
                        unit="number"
                    />
                )}

                <SnapshotSection
                    employees={business.employees}
                />

                <CustomerProductSection
                    customer={business.customer}
                    product={business.product}
                />

                <section className="border-t border-slate-200 py-8">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                            Derived metrics
                        </h2>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                            Additional metrics calculated from the detected
                            business fields. Each metric shows the calculation
                            used so the result remains explainable.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">

                        <DerivedMetricBlock
                            label="Profit margin"
                            value={
                                derived?.profit_margin?.value
                            }
                            description="Share of total revenue retained as profit."
                            formula={
                                derived?.profit_margin?.formula
                            }
                            unit="percent"
                        />

                        <DerivedMetricBlock
                            label="Cost / revenue"
                            value={
                                derived?.cost_revenue_ratio?.value
                            }
                            description="Share of total revenue represented by cost."
                            formula={
                                derived?.cost_revenue_ratio?.formula
                            }
                            unit="percent"
                        />

                        <DerivedMetricBlock
                            label="Revenue / employee"
                            value={
                                derived?.revenue_per_employee?.value
                            }
                            description="Revenue generated per average employee."
                            formula={
                                derived?.revenue_per_employee?.formula
                            }
                            unit="currency"
                        />

                        <DerivedMetricBlock
                            label="Profit / employee"
                            value={
                                derived?.profit_per_employee?.value
                            }
                            description="Profit generated per average employee."
                            formula={
                                derived?.profit_per_employee?.formula
                            }
                            unit="currency"
                        />

                        <DerivedMetricBlock
                            label="Revenue / customer"
                            value={
                                derived?.revenue_per_customer?.value
                            }
                            description="Average revenue represented by each unique customer."
                            formula={
                                derived?.revenue_per_customer?.formula
                            }
                            unit="currency"
                        />

                        <DerivedMetricBlock
                            label="Revenue / product"
                            value={
                                derived?.revenue_per_product?.value
                            }
                            description="Average revenue represented by each unique product."
                            formula={
                                derived?.revenue_per_product?.formula
                            }
                            unit="currency"
                        />

                    </div>
                </section>

            </div>
        </WorkspaceShell>
    );
}