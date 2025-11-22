"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScenarioError } from "@/app/dashboard/courses/manage-course/manage-course-client";

const uuid = () => crypto.randomUUID();
const Editor = dynamic(() => import("../lesson/editor"), { ssr: false });

interface Rubric {
  id: string;
  description: string;
  weight: number;
}

interface Scenario {
  title: string;
  instructions: any;
  rubric: Rubric[];
}

interface ScenarioFormProps {
  scenario: Scenario;
  // onUpdate: (scenario: Scenario) => void;
  onChange: (patch: Partial<{}>) => void;
  error: ScenarioError;
}

export default function ScenarioForm({
  scenario,
  // onUpdate,
  onChange,
  error,
}: ScenarioFormProps) {
  const [localScenario, setLocalScenario] = useState(scenario);
  const weight = Array.from({ length: 5 }, (_, i) => i + 1);

  const addAction = () => {
    const newRubric: Rubric = {
      id: uuid(),
      description: "",
      weight: 1,
    };

    const updated = [...localScenario.rubric, newRubric];
    setLocalScenario((prev) => ({ ...prev, rubric: updated }));
    onChange({ rubric: updated });
  };

  const updateAction = (actionId: string, field: string, value: any) => {
    const updated = localScenario.rubric.map((r) =>
      r.id === actionId ? { ...r, [field]: value } : r
    );

    setLocalScenario((prev) => ({ ...prev, rubric: updated }));
    onChange({ rubric: updated });
  };

  const removeAction = (actionId: string) => {
    const updated = localScenario.rubric.filter((r) => r.id !== actionId);

    setLocalScenario((prev) => ({ ...prev, rubric: updated }));
    onChange({ rubric: updated });
  };

  const [initialInstructions] = useState(() => {
    let parsed = localScenario.instructions;

    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch (e) {
        parsed = null;
      }
    }

    if (!parsed || !parsed.blocks) {
      parsed = { time: Date.now(), blocks: [] };
    }

    return parsed;
  });

  console.log(error);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Scenario Title</label>
        <Input
          value={localScenario?.title}
          placeholder="e.g., The hallway disclosure"
          onChange={(e) => {
            setLocalScenario((prev) => ({ ...prev, title: e.target.value }));
            onChange({ title: e.target.value });
          }}
          className="mt-1"
        />
        {error?.title && (
          <p className="mt-1 text-sm text-red-500">{error?.title}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Scenario</label>
        <Editor
          key={"scenario-editor"}
          initialData={initialInstructions}
          onChange={(data) => {
            const normalized =
              typeof data === "string" ? JSON.parse(data) : data;

            setLocalScenario((prev) => ({ ...prev, instructions: normalized }));
            onChange({
              instructions: typeof data === "string" ? JSON.parse(data) : data,
            });
          }}
        />
        {error?.instructions && (
          <p className="mt-1 text-sm text-red-500">{error?.instructions}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Actions</label>
        <div className="space-y-4">
          {localScenario.rubric.map((action, index) => (
            <div key={action.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rubric {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAction(action.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <label className="text-xs font-medium">Explanation (Why)</label>
                <Textarea
                  placeholder="Briefly expain this rubric option ..."
                  value={action.description}
                  onChange={(e) =>
                    updateAction(action.id, "description", e.target.value)
                  }
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-xs font-medium">Weight</label>
                <Select
                  value={String(action.weight)}
                  onValueChange={(val) =>
                    updateAction(action.id, "weight", Number(val))
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select weight</SelectLabel>
                      {weight.map((num, index) => (
                        <SelectItem value={num.toString()} key={num}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}

          <Button
            onClick={addAction}
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add rubric
          </Button>
          {error?.rubric && (
            <p className="mt-1 text-sm text-red-500">{error?.rubric}</p>
          )}
        </div>
      </div>
    </div>
  );
}
