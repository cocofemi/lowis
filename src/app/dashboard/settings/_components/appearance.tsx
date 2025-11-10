import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function Appearance() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how kervah looks for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select defaultValue="dark">
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="pst">
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                <SelectItem value="cst">Central Time (CT)</SelectItem>
                <SelectItem value="est">Eastern Time (ET)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>
            Control your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Analytics</div>
              <div className="text-sm text-muted-foreground">
                Help us improve by sharing anonymous usage data
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full bg-transparent">
              Download My Data
            </Button>
            <Button
              variant="outline"
              className="w-full text-destructive bg-transparent"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Appearance;
