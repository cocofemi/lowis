import React from "react";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import { ProductPreview } from "./product-preview";
import { MadeFor } from "./made-for";
import Footer from "@/components/home/Footer";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/home/Navbar";
import CTA from "./home/CTA";

function Homepage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <ProductPreview />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <CTA />
      {/* <MadeFor /> */}
      <Footer />
    </main>
  );
}

export default Homepage;
