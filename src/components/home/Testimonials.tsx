import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Care Home Manager",
    facility: "Sunshine Care Home",
    content:
      "CareAcademy has transformed how we train our staff. The courses are relevant, engaging, and our team actually enjoys learning. We've seen a significant improvement in care quality.",
    rating: 5,
  },
  {
    name: "James Thompson",
    role: "Training Coordinator",
    facility: "Heritage Senior Living",
    content:
      "The compliance tracking feature alone is worth it. No more spreadsheets or missed renewals. Everything is automated and we have full visibility of our team's training status.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Director of Nursing",
    facility: "Oakwood Care Centre",
    content:
      "Our staff retention has improved since implementing CareAcademy. The career development opportunities through certified courses have made a real difference to team morale.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by Care Professionals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what care home managers say about CareAcademy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-accent"
                    />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary">
                    {testimonial.facility}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
