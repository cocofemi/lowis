import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroImage from "../../../public/support-worker.avif";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary">
                Trusted by 500+ Care Homes
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empower Your Care Team with{" "}
              <span className="text-primary">Professional Training</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              The complete learning platform designed specifically for care
              workers. Build skills, earn certificates, and deliver exceptional
              care.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">
                  Active Learners
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">250+</div>
                <div className="text-sm text-muted-foreground">
                  Courses Available
                </div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20" />
            <Image
              src={heroImage}
              alt="Care workers learning together"
              className="relative rounded-3xl shadow-card w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
