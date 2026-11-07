const stats = [
    {
        value: "CSV",
        label: "Input format",
    },
    {
        value: "20+",
        label: "Business signals",
    },
    {
        value: "AI",
        label: "Assisted interpretation",
    },
    {
        value: "1",
        label: "Analytics workspace",
    },
];

type Props = {
    embedded?: boolean;
};

export default function Stats({ embedded = false }: Props) {
    return (
        <section className={embedded ? "flex items-center" : "py-18"}>
            <div
                className={`mx-auto grid ${
                    embedded
                        ? "w-full max-w-lg grid-cols-2 gap-x-10 gap-y-8"
                        : "max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4"
                }`}
            >
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className={`border-t border-slate-200 pt-4 transition-all duration-300 ${
                            embedded
                                ? "hover:-translate-y-0.5"
                                : "rounded-2xl border bg-white p-8 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg"
                        }`}
                    >
                        <h2
                            className={
                                embedded
                                    ? "text-2xl font-semibold tracking-tight text-slate-950"
                                    : "text-4xl font-bold text-slate-950"
                            }
                        >
                            {stat.value}
                        </h2>

                        <p
                            className={
                                embedded
                                    ? "mt-1.5 text-sm text-slate-500"
                                    : "mt-3 text-slate-600"
                            }
                        >
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}