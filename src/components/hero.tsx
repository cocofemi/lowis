import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="container mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-12">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block">
          <span className=" text-4xl font-medium !text-white">
            Introducing lowis
          </span>
        </div>

        <h1 className="mb-6 text-balance font-sans text-xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          The support assistant that{" "}
          <span className="inner-headings align-baseline">
            {/* sizer establishes width/height using the longest word */}
            <span className="sizer italic">simplifies</span>

            {/* animated stack (absolute) */}
            <span className="words italic text-purple-700">
              understands
              <br />
              simplifies
              <br />
              clarifies
              <br />
              explains
              <br />
              understands
            </span>
          </span>{" "}
          your questions
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Streamline your questions, get instant and credible answers, and boost
          productivity with an AI assistant built to support modern care
          workers.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="group h-12 gap-2 bg-white px-8 text-base font-medium text-black hover:bg-white/90 cursor-pointer"
          >
            Try lowis Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/20 bg-transparent px-8 text-base font-medium text-white hover:bg-purple-700 hover:text-white cursor-pointer"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
