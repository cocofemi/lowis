import { UserPlus, GraduationCap, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up Your Team",
    description:
      "Create your care home account and invite team members in minutes. No technical knowledge required.",
  },
  {
    icon: GraduationCap,
    title: "Start Learning",
    description:
      "Access our library of courses. Your team learns at their own pace, on any device, anywhere.",
  },
  {
    icon: Trophy,
    title: "Earn Certificates",
    description:
      "Complete courses, pass assessments, and receive recognized certificates instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple. Effective. Proven.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your team learning in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center shadow-soft">
                    <step.icon className="h-12 w-12 text-green-700" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold ">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
