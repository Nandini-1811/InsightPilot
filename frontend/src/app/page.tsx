import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import UploadCard from "@/components/upload/UploadCard";
import Features from "@/components/home/Features";
import Footer from "@/components/layout/Footer";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      <Navbar />
    <Background />

    <Hero />

    <Stats />

    <UploadCard />

    <HowItWorks />

    <Features />

    <CTA />

    <Footer />
    </main>
  );
}