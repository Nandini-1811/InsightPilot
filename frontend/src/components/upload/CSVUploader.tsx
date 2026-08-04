"use client";

import { useState } from "react";
import { uploadCSV } from "@/services/api";

export default function CSVUploader() {

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);


    async function handleUpload() {

        if (!file) return;

        try {

            setLoading(true);

            const response = await uploadCSV(file);

            setResult(response);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="mt-6">

            <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-3">

                    <label
                        className="
            inline-flex
            items-center
            justify-center
            w-fit
            bg-gray-200
            hover:bg-gray-300
            text-gray-800
            px-4
            py-2
            rounded-lg
            cursor-pointer
        "
                    >
                        Choose CSV File

                        <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={(e) =>
                                setFile(
                                    e.target.files?.[0] || null
                                )
                            }
                        />
                    </label>


                    {
                        file && (
                            <p className="text-sm text-gray-700">
                                Selected: {file.name}
                            </p>
                        )
                    }

                </div>


                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        font-medium
                        px-5
                        py-2
                        rounded-lg
                        disabled:bg-gray-400
                        cursor-pointer
                    "
                >
                    {
                        loading
                            ? "Analyzing..."
                            : "Upload CSV"
                    }
                </button>

            </div>


            {
                result && (

                    <div className="
                        mt-6
                        bg-gray-900
                        text-green-400
                        p-4
                        rounded-lg
                        overflow-auto
                        max-h-[500px]
                    ">
                        <pre>
                            {
                                JSON.stringify(
                                    result,
                                    null,
                                    2
                                )
                            }
                        </pre>
                    </div>

                )
            }

        </div>
    );
}