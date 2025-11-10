"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import GroupsTable from "@/components/groups/groups-table";
import AddGroupModal from "@/components/groups/add-group-modal";

export default function GroupsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Beginner Cohort",
      description: "Introduction to AI and machine learning basics",
      startDate: "2024-01-15",
      coursesCount: 3,
      membersCount: 12,
      isActive: true,
    },
    {
      id: 2,
      name: "Advanced Track",
      description: "Advanced topics in AI and deep learning",
      startDate: "2024-02-01",
      coursesCount: 5,
      membersCount: 8,
      isActive: true,
    },
    {
      id: 3,
      name: "Q1 Training",
      description: "Quarterly training program",
      startDate: "2024-01-01",
      coursesCount: 2,
      membersCount: 15,
      isActive: false,
    },
  ]);

  const handleAddGroup = (newGroup: any) => {
    const group = {
      id: Math.max(...groups.map((g) => g.id), 0) + 1,
      ...newGroup,
      coursesCount: 0,
      membersCount: 0,
      isActive: true,
    };
    setGroups([...groups, group]);
    setIsAddModalOpen(false);
  };

  const handleToggleActive = (id: number) => {
    setGroups(
      groups.map((g) => (g.id === id ? { ...g, isActive: !g.isActive } : g))
    );
  };

  const handleDeleteGroup = (id: number) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize learning groups
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Group
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Groups</CardTitle>
          <CardDescription>View and manage all learning groups</CardDescription>
        </CardHeader>
        <CardContent>
          <GroupsTable
            groups={groups}
            onToggleActive={handleToggleActive}
            onDelete={handleDeleteGroup}
          />
        </CardContent>
      </Card>

      <AddGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGroup}
      />
    </div>
  );
}
