"use client";

import Link from "next/link";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type Props = {
    items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: Props) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm"
        >
            {items.map((item, index) => (
                <div
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-2"
                >
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="font-medium text-slate-500 transition hover:text-blue-600"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-semibold text-slate-900">
                            {item.label}
                        </span>
                    )}

                    {index < items.length - 1 && (
                        <span
                            aria-hidden="true"
                            className="text-slate-300"
                        >
                            /
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}