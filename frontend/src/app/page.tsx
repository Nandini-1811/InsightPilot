import CSVUploader from "@/components/upload/CSVUploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl w-[500px]">
        <h1 className="text-4xl font-bold text-black">
          InsightPilot
        </h1>

        <p className="text-gray-600 mt-2">
          Upload your business data and get AI-powered insights.
        </p>

        <div className="mt-6">
          <CSVUploader />
        </div>
      </div>
    </main>
  );
}