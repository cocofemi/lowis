import { Sparkles, Zap, Shield, Users } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "Intelligent Automation",
    description: "Let lowis handle repetitive tasks while you focus on what matters most.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant responses and complete tasks in seconds, not hours.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your data is encrypted and secure with enterprise-grade protection.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share insights and workflows seamlessly across your entire team.",
  },
]

export function Features() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-white md:text-5xl">Built for productivity</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Everything you need to supercharge your workflow and get more done.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-white/10 bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
