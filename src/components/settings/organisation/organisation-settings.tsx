import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./profile";
import Notifications from "./notifications";
import Appearance from "./appearance";
import Billing from "./billing";

interface Props {
  organisationId: string;
  organisationRole: string;
}

export default function OrganisationSettingsPage({
  organisationId,
  organisationRole,
}: Props) {
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

          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Profile
            organisationId={organisationId}
            organisationRole={organisationRole}
          />
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
