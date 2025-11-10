import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

function Security() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <div className="flex justify-end">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Enable 2FA</div>
              <div className="text-sm text-muted-foreground">
                Require a verification code in addition to your password
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage your active sessions across devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Chrome on MacOS</p>
                <p className="text-xs text-muted-foreground">
                  San Francisco, CA • Current session
                </p>
              </div>
              <Button variant="ghost" size="sm" disabled>
                Current
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Safari on iPhone</p>
                <p className="text-xs text-muted-foreground">
                  San Francisco, CA • 2 hours ago
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
}

export default Security;
