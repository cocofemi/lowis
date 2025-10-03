import React from "react";
import { Hero } from "./hero";
import { Features } from "./features";
import { ProductPreview } from "./product-preview";
import { MadeFor } from "./made-for";
import { Footer } from "./footer";
import { MainNav } from "./nav";

function Homepage() {
  return (
    <main className="min-h-screen bg-black">
      <MainNav />
      <Hero />
      <Features />
      <ProductPreview />
      <MadeFor />
      <Footer />
    </main>
  );
}

export default Homepage;
