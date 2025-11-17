import {
  BookOpen,
  Award,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Courses",
    description:
      "250+ courses covering all aspects of care work, from basics to advanced specializations.",
  },
  {
    icon: Award,
    title: "Recognized Certificates",
    description:
      "Industry-recognized certifications that help your team advance their careers.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Easy-to-use dashboard to track progress, assign courses, and manage your entire team.",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description:
      "Learn at your own pace with 24/7 access to all materials on any device.",
  },
  {
    icon: CheckCircle,
    title: "Compliance Tracking",
    description:
      "Stay compliant with automated tracking of mandatory training and renewals.",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description:
      "Detailed insights and reports to measure team performance and identify gaps.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete learning ecosystem designed specifically for the care
            industry
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-card"
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
