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
            <div
              key={index}
              className="relative p-8 bg-white rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/50 transform hover:-translate-y-1"
            >
              <dt>
                <div className="absolute flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-white shadow-xl">
                  <feature.icon className="h-7 w-7" />
                </div>
                <p className="ml-20 text-xl leading-8 font-semibold text-gray-900">
                  {feature.title}
                </p>
              </dt>
              <dd className="mt-3 ml-20 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
