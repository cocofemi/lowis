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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Plus, X, Pencil, Save } from "lucide-react";
import AddCoursesToGroupModal from "./add-courses-to-group-modal";
import AddMembersToGroupModal from "./add-members-to-group-modal";
import { Group } from "@/types/index.types";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import { useGroup } from "@/hooks/use-groups";
import { useMutation } from "@apollo/client/react";
import {
  EDIT_GROUP,
  REMOVE_GROUP_MEMBER,
} from "@/app/graphql/queries/groups/group-queries";
import { toast } from "sonner";
import { useMembers } from "@/hooks/use-members";
import { Spinner } from "../ui/spinner";

const groupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  retakeIntervalMonths: z.string().min(1, "Select retake interval"),
});

interface GroupDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  group: Group;
  organisationId: string;
}

export default function GroupDetailsModal({
  isOpen,
  onClose,
  group,
  organisationId,
}: GroupDetailsModalProps) {
  const { refetch } = useGroup(organisationId);
  const [editGroup, { loading }] = useMutation(EDIT_GROUP);
  const { data, loading: membersLoading, error } = useMembers(organisationId);

  const [removeMember] = useMutation(REMOVE_GROUP_MEMBER);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddCoursesOpen, setIsAddCoursesOpen] = useState(false);
  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to AI", instructor: "John Doe" },
    { id: 2, title: "Machine Learning Basics", instructor: "Jane Smith" },
    { id: 3, title: "Deep Learning Advanced", instructor: "Bob Johnson" },
  ]);

  const handleRemoveCourse = (courseId: number) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const handleRemoveMember = async (memberId: string) => {
    console.log(memberId);
    try {
      await removeMember({
        variables: {
          input: {
            groupId: group?.id,
            memberIds: [memberId],
          },
        },
      });
      refetch();
      console.log("Member removed from group");
      toast.success("Member removed from group");
      onClose();
    } catch (error) {
      console.log("There was a problem removing members group");
      toast.warning("There was a problem removing members group");
    }
  };

  const handleAddCourses = (selectedCourses: any[]) => {
    setCourses([...courses, ...selectedCourses]);
    setIsAddCoursesOpen(false);
  };

  // const handleAddMembers = (selectedMembers: any[]) => {
  //   // setMembers([...members, ...selectedMembers]);
  //   // setIsAddMembersOpen(false);
  // };

  const handleEditToggle = () => {
    form.reset({
      name: group.name,
      description: group.description,
      retakeIntervalMonths: String(group.retakeIntervalMonths),
    });

    setIsEditMode(!isEditMode);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  type GroupInput = z.infer<typeof groupSchema>;

  const form = useForm<GroupInput>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      retakeIntervalMonths: months[0].toString(),
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: GroupInput) => {
    try {
      await editGroup({
        variables: {
          input: {
            groupId: group?.id,
            name: data?.name,
            description: data?.description,
            retakeIntervalMonths: Number(data?.retakeIntervalMonths),
          },
        },
      });
      refetch();
      setIsEditMode(false);
      toast.success("Group has been edited");
    } catch (error) {
      console.log("There was a problem editing group");
      toast.warning("There was a problem editing group ");
    }
  };

  if (membersLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner />
        <span className="ml-3 text-gray-500">Loading members...</span>
      </div>
    );
  }

  console.log(group?.members);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogTitle></DialogTitle>
          <Form {...form}>
            <form
              id="group-form"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <DialogHeader>
                {isEditMode ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="group-name">Group Name</Label>
                      <Input
                        id="group-name"
                        {...register("name")}
                        defaultValue={group.name}
                        className="text-lg font-semibold"
                      />
                      {errors?.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors?.name?.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group-description">Description</Label>
                      <Textarea
                        id="group-description"
                        {...register("description")}
                        defaultValue={group.description}
                        rows={3}
                      />
                      {errors?.description && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors?.description?.message}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <DialogTitle>{group.name}</DialogTitle>
                    <DialogDescription>{group.description}</DialogDescription>
                  </>
                )}
              </DialogHeader>

              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Retake interval
                  </p>
                  {isEditMode ? (
                    <div className="space-y-1">
                      <Controller
                        control={control}
                        name="retakeIntervalMonths"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={String(field.value)}
                          >
                            <SelectTrigger className="w-[80px]">
                              <SelectValue placeholder="Choose month" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select month</SelectLabel>
                                {months.map((num, index) => (
                                  <SelectItem value={num.toString()} key={num}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors?.retakeIntervalMonths && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors?.retakeIntervalMonths?.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="font-medium">{`${group?.retakeIntervalMonths} months`}</p>
                  )}
                </div>
                {/* <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={group.isActive ? "default" : "secondary"}>
                {group.isActive ? "Active" : "Inactive"}
              </Badge>
            </div> */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="font-medium">{group?.members.length}</p>
                </div>
              </div>

              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      Assigned Courses ({courses.length})
                    </h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAddCoursesOpen(true)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Courses
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {courses.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4">
                        No courses assigned yet
                      </p>
                    ) : (
                      courses.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">
                                {course.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {course.instructor}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveCourse(course.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="members" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      Group Members ({group?.members.length})
                    </h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAddMembersOpen(true)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Members
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {group?.members.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4">
                        No members added yet
                      </p>
                    ) : (
                      group?.members.map((member) => (
                        <div
                          key={`${member?.id}-${member?.fname}`}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">
                                {`${member?.fname} ${member?.lname}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member?.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <Badge variant="outline" className="text-xs">
                              {member?.role}
                            </Badge> */}
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveMember(member?.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
          <div className="flex justify-end gap-2 pt-4">
            {isEditMode ? (
              <Button
                type="submit"
                form="group-form"
                className="gap-2"
                disabled={loading}
              >
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            ) : (
              <Button
                variant="outline"
                type="button"
                onClick={handleEditToggle}
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit Details
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AddCoursesToGroupModal
        isOpen={isAddCoursesOpen}
        onClose={() => setIsAddCoursesOpen(false)}
        onAdd={handleAddCourses}
      />
      {}
      <AddMembersToGroupModal
        isOpen={isAddMembersOpen}
        onClose={() => setIsAddMembersOpen(false)}
        // onAdd={handleAddMembers}
        members={data?.members}
        organisationId={organisationId}
        groupId={group?.id}
      />
    </>
  );
}
