import {
    BarChart3,
    Sparkles,
    MessageSquare,
    ShieldCheck,
} from "lucide-react";


export default function Hero() {
    return (
        <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 pt-24">
            <div className="grid w-full items-center gap-16 lg:grid-cols-2">
                {/* LEFT */}
                <div>
                    <div className="mb-6 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                        AI Powered Business Intelligence
                    </div>

                    <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
                        Analyze your
                        <span className="block text-blue-600">
                            Business Data
                        </span>
                        in Seconds
                    </h1>

                    <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">
                        Upload your CSV and instantly receive interactive dashboards,
                        business health scores, AI-powered insights, recommendations and
                        an intelligent assistant that understands your data.
                    </p>

                    <div className="mt-10 flex gap-5">
                        <a
                            href="#upload"
                            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Upload CSV
                        </a>

                        <a
                            href="#how-it-works"
                            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Learn More
                        </a>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-4">
                        <div className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                            <BarChart3 className="h-4 w-4 text-blue-600 transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium text-slate-700">
                                Dashboard
                            </span>
                        </div>

                        <div className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg">
                            <Sparkles className="h-4 w-4 text-purple-600 transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium text-slate-700">
                                AI Summary
                            </span>
                        </div>

                        <div className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                            <ShieldCheck className="h-4 w-4 text-emerald-600 transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium text-slate-700">
                                Business Health
                            </span>
                        </div>

                        <div className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                            <MessageSquare className="h-4 w-4 text-indigo-600 transition-transform group-hover:scale-110" />
                            <span className="text-sm font-medium text-slate-700">
                                AI Chat
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900">
                                Business Overview
                            </h2>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                Healthy
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm font-medium text-slate-700">Revenue</p>
                                <h3 className="mt-2 text-3xl font-bold text-slate-800">$13.0M</h3>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm text-slate-500">Growth</p>
                                <h3 className="mt-2 text-3xl font-bold text-slate-800">7.69%</h3>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm text-slate-500">Employees</p>
                                <h3 className="mt-2 text-3xl font-bold text-slate-800">162K</h3>
                            </div>

                            <div className="rounded-xl bg-slate-50 p-5">
                                <p className="text-sm text-slate-500">Health</p>
                                <h3 className="mt-2 text-3xl font-bold text-green-600">
                                    100
                                </h3>
                            </div>
                        </div>

                        <div className="mt-8 rounded-xl bg-blue-50 p-5">
                            <p className="text-sm font-medium text-blue-700">
                                AI Insight
                            </p>

                            <p className="mt-2 text-slate-700">
                                Revenue is growing steadily while maintaining excellent data
                                quality. The dataset is ready for advanced business analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}