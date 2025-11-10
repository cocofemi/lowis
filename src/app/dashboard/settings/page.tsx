import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./_components/profile";
import Security from "./_components/security";
import Notifications from "./_components/notifications";
import Appearance from "./_components/appearance";
import Billing from "./_components/billing";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Profile />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Security />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Notifications />
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Appearance />
        </TabsContent>
        <TabsContent value="billing" className="space-y-6">
          <Billing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
