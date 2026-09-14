export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-slate-50" />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-20 top-32 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="absolute right-20 top-60 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#64748b 1px,transparent 1px),
            linear-gradient(to bottom,#64748b 1px,transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </>
  );
}