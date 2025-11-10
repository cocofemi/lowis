"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface Action {
  id: string;
  label: string;
  correct: boolean;
  why: string;
}

interface Scenario {
  id: string;
  title: string;
  situation: string;
  actions: Action[];
  notes?: string[];
}

interface ScenarioFormProps {
  scenario: Scenario;
  onUpdate: (scenario: Scenario) => void;
}

export default function ScenarioForm({
  scenario,
  onUpdate,
}: ScenarioFormProps) {
  const [localScenario, setLocalScenario] = useState(scenario);

  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...localScenario, [field]: value };
    setLocalScenario(updated);
    onUpdate(updated);
  };

  const addAction = () => {
    const newAction: Action = {
      id: `a${Date.now()}`,
      label: "",
      correct: false,
      why: "",
    };
    handleFieldChange("actions", [...localScenario.actions, newAction]);
  };

  const updateAction = (actionId: string, field: string, value: any) => {
    const updated = localScenario.actions.map((a) =>
      a.id === actionId ? { ...a, [field]: value } : a
    );
    handleFieldChange("actions", updated);
  };

  const removeAction = (actionId: string) => {
    handleFieldChange(
      "actions",
      localScenario.actions.filter((a) => a.id !== actionId)
    );
  };

  const addNote = () => {
    handleFieldChange("notes", [...(localScenario.notes || []), ""]);
  };

  const updateNote = (index: number, value: string) => {
    const updated = [...(localScenario.notes || [])];
    updated[index] = value;
    handleFieldChange("notes", updated);
  };

  const removeNote = (index: number) => {
    handleFieldChange(
      "notes",
      (localScenario.notes || []).filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium">Scenario Title</label>
        <Input
          placeholder="e.g., The hallway disclosure"
          value={localScenario.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Situation</label>
        <Textarea
          placeholder="Describe the scenario situation..."
          value={localScenario.situation}
          onChange={(e) => handleFieldChange("situation", e.target.value)}
          className="mt-1"
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Actions</label>
        <div className="space-y-4">
          {localScenario.actions.map((action, index) => (
            <div key={action.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Action {index + 1}</span>
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
                <label className="text-xs font-medium">Action Label</label>
                <Input
                  placeholder="What is this action option?"
                  value={action.label}
                  onChange={(e) =>
                    updateAction(action.id, "label", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id={`correct-${action.id}`}
                  checked={action.correct}
                  onCheckedChange={(checked) =>
                    updateAction(action.id, "correct", checked)
                  }
                />
                <label
                  htmlFor={`correct-${action.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  This is the correct action
                </label>
              </div>

              <div>
                <label className="text-xs font-medium">Explanation (Why)</label>
                <Textarea
                  placeholder="Explain why this action is correct or incorrect..."
                  value={action.why}
                  onChange={(e) =>
                    updateAction(action.id, "why", e.target.value)
                  }
                  className="mt-1"
                  rows={2}
                />
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
            Add Action
          </Button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Notes</label>
        <div className="space-y-2">
          {(localScenario.notes || []).map((note, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Note ${index + 1}`}
                value={note}
                onChange={(e) => updateNote(index, e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeNote(index)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={addNote}
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}
