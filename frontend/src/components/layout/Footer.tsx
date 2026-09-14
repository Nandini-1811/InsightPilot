export default function Footer() {
  return (
    <footer id="about" className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
        <div>
          <span className="font-semibold text-slate-700">
            InsightPilot
          </span>{" "}
          © {new Date().getFullYear()} All rights reserved.
        </div>

        <div className="flex gap-6">
          <a
            href="#"
            className="transition hover:text-blue-600"
          >
            Documentation
          </a>

          <a
            href="#"
            className="transition hover:text-blue-600"
          >
            Privacy
          </a>

          <a
            href="#"
            className="transition hover:text-blue-600"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}