import Image from "next/image";
import dashboardLowis from "../../public/dashboard-lowis.png";

export function ProductPreview() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-5xl">
            See lowis in action
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Experience the power of AI-driven assistance designed for your
            workflow.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-card to-background p-2 shadow-2xl">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-secondary">
            <Image
              src={dashboardLowis}
              alt="lowis AI Assistant Dashboard"
              width={1200}
              height={300}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-white">10x</div>
            <div className="text-sm text-muted-foreground">
              Faster task completion
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-white">95%</div>
            <div className="text-sm text-muted-foreground">Accuracy rate</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-white">24/7</div>
            <div className="text-sm text-muted-foreground">
              Always available
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
