"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AssignCoursesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  memberId: string | null
}

// Mock courses data - replace with real data from your backend
const mockCourses = [
  {
    id: "1",
    title: "Introduction to AI",
    description: "Learn the basics of artificial intelligence",
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    description: "Core concepts of machine learning",
  },
  {
    id: "3",
    title: "Natural Language Processing",
    description: "Understanding NLP and its applications",
  },
  {
    id: "4",
    title: "Computer Vision",
    description: "Image processing and recognition",
  },
  {
    id: "5",
    title: "Deep Learning",
    description: "Advanced neural networks and architectures",
  },
]

export function AssignCoursesModal({ open, onOpenChange, memberId }: AssignCoursesModalProps) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  const handleAssign = async () => {
    setIsLoading(true)
    // TODO: Implement course assignment logic
    console.log("[v0] Assigning courses:", {
      memberId,
      courses: selectedCourses,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setSelectedCourses([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Courses</DialogTitle>
          <DialogDescription>
            Select the courses you want to assign to this member. They will be able to access these courses immediately.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="flex flex-col gap-4 py-4">
            {mockCourses.map((course) => (
              <div key={course.id} className="flex items-start gap-3">
                <Checkbox
                  id={course.id}
                  checked={selectedCourses.includes(course.id)}
                  onCheckedChange={() => handleToggleCourse(course.id)}
                />
                <div className="flex flex-col gap-1">
                  <Label htmlFor={course.id} className="cursor-pointer font-medium">
                    {course.title}
                  </Label>
                  <p className="text-xs text-muted-foreground">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={isLoading || selectedCourses.length === 0}>
            {isLoading
              ? "Assigning..."
              : `Assign ${selectedCourses.length} Course${selectedCourses.length !== 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
