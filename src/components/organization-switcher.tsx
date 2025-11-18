"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown, Plus, Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

// Mock organizations data
// const organizations = [
//   {
//     id: "1",
//     name: "Acme Corporation",
//     role: "Admin",
//     logo: "/generic-company-logo.png",
//   },
//   {
//     id: "2",
//     name: "TechStart Inc",
//     role: "Member",
//     logo: "/techstart-logo.jpg",
//   },
//   {
//     id: "3",
//     name: "Global Training Co",
//     role: "Admin",
//     logo: "/global-training-logo.jpg",
//   },
// ];

interface Organization {
  id: string;
  name: string;
  role: string;
}

interface ActiveOrganisationProps {
  activeBusinessId: string;
  activeBusinessName: string;
  activeBusinessRole: string;
}

export function OrganizationSwitcher({
  activeBusinessId,
}: ActiveOrganisationProps) {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [open, setOpen] = useState(false);
  const { data, loading } = useSession();

  useEffect(() => {
    if (loading || !data) return;

    const businesses = data.user.businesses.map((b: any) => ({
      id: b.id,
      name: b.business.name,
      role: b.role,
      // logo: b.business.logo,
    }));
    setOrganizations(businesses);

    //selected organisation
    const defaultOrg =
      businesses.find((b: any) => b.id === activeBusinessId) || businesses[0];

    setSelectedOrg(defaultOrg);
  }, [data, loading]);

  const handleSelectOrg = async (org: Organization) => {
    setSelectedOrg(org);
    setOpen(false);

    // Update cookie
    await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ businessId: org.id, role: org.role }),
    });

    await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        activeBusinessId: org.id,
        activeBusinessName: org.name,
        activeBusinessRole: org.role,
      }),
    });

    router.refresh();
  };

  // const handleCreateOrg = () => {
  //   setOpen(false);
  //   // TODO: Add logic to create new organization
  //   console.log("[v0] Create new organization");
  // };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {loading ? (
          <div className="flex flex-row gap-2">
            <span className="animate-pulse rounded-md bg-zinc-500/30 text-transparent ms-2 mt-2 w-[190px]">
              Loading organisations
            </span>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-between px-2 py-2 h-auto hover:bg-sidebar-accent"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium truncate max-w-[140px] capitalize">
                  {selectedOrg?.name.length > 17
                    ? `${selectedOrg?.name.substring(0, 17)}...`
                    : selectedOrg?.name}
                </span>
                <span className="text-xs text-sidebar-foreground/70 capitalize">
                  {selectedOrg?.role}
                </span>
              </div>
            </div>
            <ChevronsUpDown className="size-4 shrink-0 text-sidebar-foreground/50" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" align="start">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Your Organizations
        </DropdownMenuLabel>
        {organizations.map((org) => (
          <DropdownMenuItem
            key={`${org.id}+${org.role}`}
            onClick={() => handleSelectOrg(org)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2 flex-1">
              <Avatar className="size-8 rounded-lg">
                {/* <AvatarImage
                  src={org.logo || "/placeholder.svg"}
                  alt={org.name}
                /> */}
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {org.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium truncate">
                  {org?.name.length > 25
                    ? `${org?.name.substring(0, 25)}...`
                    : org?.name}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {org.role}
                </span>
              </div>
              {selectedOrg.id === org.id && (
                <Check className="size-4 text-primary shrink-0" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCreateOrg} className="cursor-pointer">
          <Plus className="size-4 mr-2" />
          <span>Create Organization</span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
