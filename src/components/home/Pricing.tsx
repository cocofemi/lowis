import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    description: "Perfect for small care homes",
    features: [
      "Up to 10 team members",
      "50+ essential courses",
      "Basic certificates",
      "Email support",
      "Progress tracking",
      "Mobile app access",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "149",
    description: "Most popular for growing teams",
    features: [
      "Up to 50 team members",
      "250+ courses (full library)",
      "All certificate types",
      "Priority support",
      "Advanced analytics",
      "Custom learning paths",
      "Compliance tracking",
      "Team management tools",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "399",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Full course library",
      "Custom course creation",
      "Dedicated account manager",
      "API access",
      "White-label options",
      "Advanced reporting",
      "SSO & integrations",
      "On-site training available",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your care home. All plans include a
            14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? "border-primary border-2 shadow-card scale-105"
                  : "border-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-10">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">£{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Start Free Trial
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          All plans include 14-day free trial. No credit card required. Cancel
          anytime.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
