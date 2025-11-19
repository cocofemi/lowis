"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CREATE_GROUP } from "@/app/graphql/queries/groups/group-queries";
import { useMutation } from "@apollo/client/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import { toast } from "sonner";
import { useGroup } from "@/hooks/use-groups";

const groupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  retakeIntervalMonths: z.string().min(1, "Select retake interval"),
});

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;

  organisationId: string;
}

export default function AddGroupModal({
  isOpen,
  onClose,
  organisationId,
}: AddGroupModalProps) {
  const [createGroup, { loading }] = useMutation(CREATE_GROUP);
  const { data, refetch } = useGroup(organisationId);

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
    setError,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: GroupInput) => {
    try {
      await createGroup({
        variables: {
          input: {
            businessId: organisationId,
            name: data?.name,
            description: data?.description,
            retakeIntervalMonths: Number(data?.retakeIntervalMonths),
          },
        },
      });
      refetch();
      console.log("New group was created");
      toast.success("New group created");
      onClose();
    } catch (error) {
      console.log("There was a problem creating group");
      toast.warning("There was a problem creating group ");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Add a new learning group with name, description, and start date
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Group Name</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="e.g., Beginner Cohort"
              />
              {errors?.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.name?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                id="description"
                placeholder="Describe the purpose and focus of this group"
                rows={3}
              />
              {errors?.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Retake interval(Months)</Label>
              <Controller
                control={control}
                name="retakeIntervalMonths"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    <SelectTrigger className="w-[180px]">
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
              />{" "}
              {errors?.retakeIntervalMonths && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.retakeIntervalMonths?.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating Group..." : "Create Group"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
