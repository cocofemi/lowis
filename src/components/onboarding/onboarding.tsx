"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, UserPlus, ArrowLeft } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/KervahLogo1Logo.svg";
import { UserOnboarding } from "./user-onboarding";
import { BusinessOnboarding } from "./business-onboarding";

type OnboardingStep = "choice" | "setup-business" | "join-business";

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("choice");
  const [formData, setFormData] = useState({
    // Business setup fields
    organizationName: "",
    organizationAddress: "",
    phoneNumber: "",
    serviceType: "",

    // Join business fields
    occupation: "",
    department: "",
    employeeId: "",
    role: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Form submitted:", formData);
    // Handle form submission - redirect to dashboard
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md ">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-black">
              <Image
                src={logo}
                alt="logo"
                width={70}
                height={70}
                className="mt-1"
              />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {step === "choice" && "Personalisation"}
            {step === "setup-business" && "Setup Your Business"}
            {step === "join-business" && "Join a Business"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {step === "choice" && "Please choose the option that describes you"}
            {step === "setup-business" && "Tell us about your organization"}
            {step === "join-business" && "Tell us about your role"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "choice" && (
            <div className="space-y-4">
              <Button
                onClick={() => setStep("setup-business")}
                className="w-full h-auto py-6 bg-blue-600 hover:bg-blue-700 flex flex-col items-center gap-2"
              >
                <Building2 className="w-8 h-8" />
                <div>
                  <div className="font-semibold text-lg">Setup a Business</div>
                  <div className="text-sm text-blue-100">
                    Create and manage your organization
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => setStep("join-business")}
                className="w-full h-auto py-6 bg-zinc-800 hover:bg-zinc-700 flex flex-col items-center gap-2"
              >
                <UserPlus className="w-8 h-8" />
                <div>
                  <div className="font-semibold text-lg">Join a Business</div>
                  <div className="text-sm text-zinc-300">
                    Join an existing organization
                  </div>
                </div>
              </Button>
            </div>
          )}

          {step === "setup-business" && <BusinessOnboarding />}

          {step === "join-business" && <UserOnboarding />}
        </CardContent>
      </Card>
    </div>
  );
}
