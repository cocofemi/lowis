import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, CreditCard, Download } from "lucide-react";

function Billing() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
                <Badge className="bg-blue-600">Active</Badge>
              </div>
              <p className="text-muted-foreground">
                Perfect for growing businesses
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">$99</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-semibold">Plan Features</h4>
            <div className="grid gap-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-green-500" />
                <span>Up to 100 users</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-green-500" />
                <span>Unlimited courses</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-green-500" />
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-green-500" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-green-500" />
                <span>Custom certificates</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Next billing date</p>
              <p className="text-sm text-muted-foreground">February 15, 2025</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm font-medium">Current usage</p>
              <p className="text-sm text-muted-foreground">45 of 100 users</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">Upgrade Plan</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Change Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="size-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Badge variant="outline">Primary</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Add Payment Method
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Update Card
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Download your previous invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">January 2025</p>
                <p className="text-xs text-muted-foreground">
                  Invoice #INV-2025-001
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">$99.00</span>
                <Badge className="bg-green-600">Paid</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">December 2024</p>
                <p className="text-xs text-muted-foreground">
                  Invoice #INV-2024-012
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">$99.00</span>
                <Badge className="bg-green-600">Paid</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">November 2024</p>
                <p className="text-xs text-muted-foreground">
                  Invoice #INV-2024-011
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">$99.00</span>
                <Badge className="bg-green-600">Paid</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Compare and upgrade to a plan that fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 space-y-4">
              <div>
                <h4 className="font-semibold">Basic</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Up to 25 users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  10 courses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Basic analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Email support
                </li>
              </ul>
              <Button variant="outline" className="w-full bg-transparent">
                Select Plan
              </Button>
            </div>

            <div className="rounded-lg border-2 border-blue-600 p-4 space-y-4 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                Current
              </Badge>
              <div>
                <h4 className="font-semibold">Pro</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Up to 100 users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Unlimited courses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Priority support
                </li>
              </ul>
              <Button className="w-full" disabled>
                Current Plan
              </Button>
            </div>

            <div className="rounded-lg border p-4 space-y-4">
              <div>
                <h4 className="font-semibold">Enterprise</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Unlimited courses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Custom analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-green-500" />
                  Dedicated support
                </li>
              </ul>
              <Button className="w-full bg-blue-600">Upgrade Now</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Billing;
