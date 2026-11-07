"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Executive Dashboard",
        href: "/overview",
    },
    {
        name: "Business Health",
        href: "/health",
    },
    {
        name: "Charts",
        href: "/charts",
    },
    {
        name: "AI Summary",
        href: "/insights",
    },
];

export default function ProductNavbar() {
    const pathname = usePathname();

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                <Link href="/">
                    <h1 className="cursor-pointer text-2xl font-extrabold text-blue-600">
                        InsightPilot
                    </h1>
                </Link>

                <nav className="flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition ${
                                pathname === link.href
                                    ? "font-semibold text-blue-600"
                                    : "text-slate-600 hover:text-blue-600"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

            </div>
        </header>
    );
}