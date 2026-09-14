"use client";

import Link from "next/link";

type Action = {
    title: string;
    description: string;
    href: string;
    color: string;
};

type Props = {
    actions: Action[];
};

export default function QuickActions({ actions }: Props) {
    return (
        <section className="mt-12">

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Continue Exploring
                </h2>

                <p className="mt-1 text-slate-500">
                    Navigate to other sections of your analysis.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {actions.map((action) => (
                    <Link
                        key={action.title}
                        href={action.href}
                        className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                    >

                        <div
                            className={`mb-6 h-2 w-full rounded-full ${action.color}`}
                        />

                        <h3 className="text-xl font-bold text-slate-900">
                            {action.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            {action.description}
                        </p>

                        <div className="mt-8 flex items-center font-semibold text-blue-600">
                            Explore

                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </div>

                    </Link>
                ))}

            </div>

        </section>
    );
}