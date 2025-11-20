"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageIcon, Plus, Trash2, Upload, Video, X } from "lucide-react";
import { Label } from "@/components/ui/label";
const Editor = dynamic(() => import("../lesson/editor"), { ssr: false });

interface QuickCheck {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Lesson {
  id: string;
  title: string;
  summary: string;
  content: string;
  media?: {
    type: "image" | "video";
    url: string;
    file?: File;
  };
  bullets: string[];
  quickChecks: QuickCheck[];
  checklist: string[];
  hints: string[];
}

interface LessonFormProps {
  lesson: Lesson;
  onUpdate: (lesson: Lesson) => void;
}

export default function LessonForm({ lesson, onUpdate }: LessonFormProps) {
  const [localLesson, setLocalLesson] = useState(lesson);
  const [content, setContent] = useState(lesson?.content ?? {});

  const [isDragging, setIsDragging] = useState(false);

  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...localLesson, [field]: value };
    setLocalLesson(updated);
    onUpdate(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Please upload an image or video file");
      return;
    }

    const url = URL.createObjectURL(file);
    handleFieldChange("media", {
      type: isImage ? "image" : "video",
      url,
      file,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const removeMedia = () => {
    if (localLesson.media?.url) {
      URL.revokeObjectURL(localLesson.media.url);
    }
    handleFieldChange("media", undefined);
  };

  // ... existing code for bullets, checklist, hints ...

  const addQuickCheck = () => {
    const newCheck: QuickCheck = {
      id: `qc${Date.now()}`,
      question: "",
      options: ["", ""],
      correctAnswer: 0,
      explanation: "",
    };
    handleFieldChange("quickChecks", [...localLesson.quickChecks, newCheck]);
  };

  const updateQuickCheck = (index: number, field: string, value) => {
    const updated = [...localLesson.quickChecks];
    updated[index] = { ...updated[index], [field]: value };
    handleFieldChange("quickChecks", updated);
  };

  const addQuickCheckOption = (checkIndex: number) => {
    const updated = [...localLesson.quickChecks];
    updated[checkIndex].options.push("");
    handleFieldChange("quickChecks", updated);
  };

  const updateQuickCheckOption = (
    checkIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updated = [...localLesson.quickChecks];
    updated[checkIndex].options[optionIndex] = value;
    handleFieldChange("quickChecks", updated);
  };

  const removeQuickCheckOption = (checkIndex: number, optionIndex: number) => {
    const updated = [...localLesson.quickChecks];
    updated[checkIndex].options = updated[checkIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    handleFieldChange("quickChecks", updated);
  };

  const removeQuickCheck = (index: number) => {
    handleFieldChange(
      "quickChecks",
      localLesson.quickChecks.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Lesson Title</label>
        <Input
          placeholder="e.g., Why this topic matters"
          value={localLesson.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Lesson Content</label>
        <Editor initialData={content} onChange={(data) => setContent(data)} />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">
          Lesson Media (Image or Video)
        </Label>

        {!localLesson.media ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2">
                <div className="p-3 rounded-full bg-muted">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="p-3 rounded-full bg-muted">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">
                  Drag and drop your image or video here
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Supports: JPG, PNG, GIF, MP4, WebM, MOV
                </p>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="media-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="pointer-events-none"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                {localLesson.media.type === "image" ? (
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                ) : (
                  <Video className="h-5 w-5 text-purple-500" />
                )}
                <span className="text-sm font-medium">
                  {localLesson.media.type === "image" ? "Image" : "Video"}{" "}
                  Preview
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeMedia}
                className="text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-lg overflow-hidden bg-black/50">
              {localLesson.media.type === "image" ? (
                <img
                  src={localLesson.media.url || "/placeholder.svg"}
                  alt="Lesson media"
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              ) : (
                <video
                  src={localLesson.media.url}
                  controls
                  className="w-full h-auto max-h-[400px]"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {localLesson.media.file && (
              <div className="mt-2 text-xs text-muted-foreground">
                File: {localLesson.media.file.name} (
                {(localLesson.media.file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>
        )}
      </div>

      {/* <div>
        <label className="text-sm font-medium">Summary</label>
        <Textarea
          placeholder="Brief summary of the lesson..."
          value={localLesson.summary}
          onChange={(e) => handleFieldChange("summary", e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div> */}

      {/* <div>
        <label className="text-sm font-medium mb-2 block">
          Key Points (Bullets)
        </label>
        <div className="space-y-2">
          {localLesson.bullets.map((bullet, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Bullet point ${index + 1}`}
                value={bullet}
                onChange={(e) => {
                  const updated = [...localLesson.bullets];
                  updated[index] = e.target.value;
                  handleFieldChange("bullets", updated);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleFieldChange(
                    "bullets",
                    localLesson.bullets.filter((_, i) => i !== index)
                  );
                }}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              handleFieldChange("bullets", [...localLesson.bullets, ""])
            }
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Bullet
          </Button>
        </div>
      </div> */}

      <div>
        <label className="text-sm font-medium mb-2 block">
          Quick Checks (Quiz Questions)
        </label>
        <div className="space-y-4">
          {localLesson.quickChecks.map((check, checkIndex) => (
            <div
              key={check.id}
              className="border rounded-lg p-4 space-y-3 bg-muted/30"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm">
                  Question {checkIndex + 1}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuickCheck(checkIndex)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <label className="text-xs font-medium">Question</label>
                <Input
                  placeholder="Enter the question..."
                  value={check.question}
                  onChange={(e) =>
                    updateQuickCheck(checkIndex, "question", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium mb-2 block">
                  Answer Options
                </label>
                <div className="space-y-2">
                  {check.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex gap-2 items-center">
                      <Input
                        type="radio"
                        name={`correct-${checkIndex}`}
                        checked={check.correctAnswer === optionIndex}
                        onChange={() =>
                          updateQuickCheck(
                            checkIndex,
                            "correctAnswer",
                            optionIndex
                          )
                        }
                        className="w-4 h-4"
                      />
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          updateQuickCheckOption(
                            checkIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeQuickCheckOption(checkIndex, optionIndex)
                        }
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() => addQuickCheckOption(checkIndex)}
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium">Explanation</label>
                <Textarea
                  placeholder="Explain the correct answer..."
                  value={check.explanation}
                  onChange={(e) =>
                    updateQuickCheck(checkIndex, "explanation", e.target.value)
                  }
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          ))}
          <Button
            onClick={addQuickCheck}
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Quick Check
          </Button>
        </div>
      </div>

      {/* <div>
        <label className="text-sm font-medium mb-2 block">
          Checklist Items
        </label>
        <div className="space-y-2">
          {localLesson.checklist.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Checklist item ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const updated = [...localLesson.checklist];
                  updated[index] = e.target.value;
                  handleFieldChange("checklist", updated);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleFieldChange(
                    "checklist",
                    localLesson.checklist.filter((_, i) => i !== index)
                  );
                }}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              handleFieldChange("checklist", [...localLesson.checklist, ""])
            }
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Checklist Item
          </Button>
        </div>
      </div> */}

      {/* <div>
        <label className="text-sm font-medium mb-2 block">Hints</label>
        <div className="space-y-2">
          {localLesson.hints.map((hint, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Hint ${index + 1}`}
                value={hint}
                onChange={(e) => {
                  const updated = [...localLesson.hints];
                  updated[index] = e.target.value;
                  handleFieldChange("hints", updated);
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleFieldChange(
                    "hints",
                    localLesson.hints.filter((_, i) => i !== index)
                  );
                }}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() =>
              handleFieldChange("hints", [...localLesson.hints, ""])
            }
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hint
          </Button>
        </div>
      </div> */}
    </div>
  );
}
