"use client";

import { useState } from "react";

import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import UploadCard from "@/components/upload/UploadCard";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  const [showUpload, setShowUpload] = useState(false);

  function handleUploadClick() {
    setShowUpload(true);

    setTimeout(() => {
      const uploadSection =
        document.getElementById("upload");

      uploadSection?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 250);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      <Navbar onUploadClick={handleUploadClick} />
      <Background />

      <Hero onUploadClick={handleUploadClick} />

      {/* Upload workspace */}
      <section
        className={`grid transition-all duration-700 ease-out ${showUpload
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div id="upload">
            <UploadCard />
          </div>
        </div>
      </section>

      <HowItWorks />

      <Features />

      <Footer />
    </main>
  );
}