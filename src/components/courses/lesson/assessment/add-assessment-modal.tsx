"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddAssessmentModal({ open, onOpenChange }: AddAssessmentModalProps) {
  const [quickCheck, setQuickCheck] = useState({
    question: "",
    options: [""],
    correctAnswer: null,
    explanation: "",
  });

  const addQuickCheckOption = () => {
    setQuickCheck((prev) => ({
      ...prev,
      options: [...prev.options, ""], // add empty option
    }));
  };

  const updateQuickCheckOption = (optionIndex: number, value: string) => {
    setQuickCheck((prev) => {
      const updated = [...prev.options];
      updated[optionIndex] = value;
      return { ...prev, options: updated };
    });
  };

  const removeQuickCheckOption = (optionIndex: number) => {
    setQuickCheck((prev) => {
      const filtered = prev.options.filter((_, i) => i !== optionIndex);
      return { ...prev, options: filtered };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a question</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-64">
          <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
            <div>
              <label className="text-xs font-medium">Question</label>
              <Input
                placeholder="Enter the question..."
                // value={check.question}
                // onChange={(e) =>
                //   updateQuickCheck(checkIndex, "question", e.target.value)
                // }
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block">
                Answer Options
              </label>
              <div className="space-y-2">
                {quickCheck.options.map((option, optionIndex) => (
                  <div className="flex gap-2 items-center" key={optionIndex}>
                    <Input
                      type="radio"
                      checked={quickCheck.correctAnswer === optionIndex}
                      onChange={() =>
                        setQuickCheck((prev) => ({
                          ...prev,
                          correctAnswer: optionIndex,
                        }))
                      }
                      className="w-4 h-4"
                    />

                    <Input
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        updateQuickCheckOption(optionIndex, e.target.value)
                      }
                      className="flex-1"
                    />

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuickCheckOption(optionIndex)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addQuickCheckOption}
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>

              <div>
                <label className="text-xs font-medium">Explanation</label>
                <Textarea
                  placeholder="Explain the correct answer..."
                  // value={check.explanation}
                  // onChange={(e) =>
                  //   updateQuickCheck(
                  //     checkIndex,
                  //     "explanation",
                  //     e.target.value
                  //   )
                  // }
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-start">
          <Button type="button">Save</Button>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddAssessmentModal;
