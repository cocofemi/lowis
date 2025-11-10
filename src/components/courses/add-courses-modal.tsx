"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

interface AddCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (members: any[]) => void;
}

export default function AddCoursesModal({
  isOpen,
  onClose,
  onAdd,
}: AddCoursesModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const availableMembers = [
    {
      id: "3",
      title: "Workplace Safety Fundamentals",
      description:
        "Essential workplace safety protocols and best practices for all employees.",

      duration: "3h",
      lessons: 10,

      category: "Safety",
    },
    {
      id: "4",
      title: "Data Privacy & Security",
      description:
        "Learn about data protection laws, GDPR compliance, and security best practices.",

      duration: "2h 45m",
      lessons: 9,

      category: "Compliance",
    },
    {
      id: "5",
      title: "Effective Communication",
      description:
        "Master communication techniques for professional and personal success.",

      duration: "1h 30m",
      lessons: 6,

      category: "Soft Skills",
    },
    {
      id: "6",
      title: "Project Management Professional",
      description:
        "Comprehensive project management methodologies including Agile and Waterfall.",

      duration: "5h 20m",
      lessons: 15,

      category: "Management",
    },
    {
      id: "7",
      title: "Mental Health Awareness",
      description:
        "Understanding mental health, reducing stigma, and supporting colleagues.",
      duration: "2h",
      lessons: 7,

      category: "Wellness",
    },
    {
      id: "8",
      title: "Diversity & Inclusion",
      description:
        "Building inclusive workplaces and understanding unconscious bias.",
      duration: "2h 15m",
      lessons: 8,
      category: "Culture",
    },
  ];

  const handleToggleMember = (memberId: number) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleAdd = () => {
    const membersToAdd = availableMembers.filter((m) =>
      selectedMembers.includes(Number(m.id))
    );
    onAdd(membersToAdd);
    setSelectedMembers([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
          <DialogDescription>
            Select courses to add to your business
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-64 border rounded-lg p-4">
          <div className="space-y-4">
            {availableMembers.map((course) => (
              <div
                key={course.id}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                <Checkbox
                  checked={selectedMembers.includes(Number(course.id))}
                  onCheckedChange={() => handleToggleMember(Number(course.id))}
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold leading-tight">
                      {course.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={selectedMembers.length === 0}>
            Add Selected ({selectedMembers.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
