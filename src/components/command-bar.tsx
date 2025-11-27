"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Upload,
  Award,
  Settings,
  Search,
  Building2,
  UserPlus,
  Bell,
  CreditCard,
  User,
  Shield,
  Palette,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommandBar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 bg-transparent"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <LayoutDashboard className="mr-2 size-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/access"))
              }
            >
              <Users className="mr-2 size-4" />
              <span>Access</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/courses"))
              }
            >
              <BookOpen className="mr-2 size-4" />
              <span>Courses</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/upload-course"))
              }
            >
              <Upload className="mr-2 size-4" />
              <span>Upload Course</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/groups"))
              }
            >
              <Users className="mr-2 size-4" />
              <span>Groups</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/certificates"))
              }
            >
              <Award className="mr-2 size-4" />
              <span>Certificates</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/settings"))
              }
            >
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/settings?tab=profile"))
              }
            >
              <User className="mr-2 size-4" />
              <span>Profile Settings</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  router.push("/dashboard/settings?tab=security")
                )
              }
            >
              <Shield className="mr-2 size-4" />
              <span>Security Settings</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  router.push("/dashboard/settings?tab=notifications")
                )
              }
            >
              <Bell className="mr-2 size-4" />
              <span>Notification Settings</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  router.push("/dashboard/settings?tab=preferences")
                )
              }
            >
              <Palette className="mr-2 size-4" />
              <span>Preferences</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/settings?tab=billing"))
              }
            >
              <CreditCard className="mr-2 size-4" />
              <span>Billing & Subscription</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => runCommand(() => console.log("Invite member"))}
            >
              <UserPlus className="mr-2 size-4" />
              <span>Invite Member</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/upload-course"))
              }
            >
              <Upload className="mr-2 size-4" />
              <span>Create New Course</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => console.log("Create group"))}
            >
              <Users className="mr-2 size-4" />
              <span>Create Group</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => console.log("View certificates"))
              }
            >
              <FileText className="mr-2 size-4" />
              <span>View All Certificates</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Organizations">
            <CommandItem
              onSelect={() =>
                runCommand(() => console.log("Switch organization"))
              }
            >
              <Building2 className="mr-2 size-4" />
              <span>Switch Organization</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => console.log("Create organization"))
              }
            >
              <Building2 className="mr-2 size-4" />
              <span>Create Organization</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
