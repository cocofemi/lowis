import { z } from "zod";
import type { UIMessage } from "ai";

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export type ChatMessage = UIMessage<
  MessageMetadata
//   CustomUIDataTypes
>;

export type CustomUIDataTypes = {
  textDelta: string;
  imageDelta: string;
  sheetDelta: string;
  codeDelta: string;
  appendMessage: string;
  id: string;
  title: string;
  clear: null;
  finish: null;

};

export type Option = { 
    id: string; 
    label: string; 
    correct: boolean; 
    why: string 
};
export type QuickCheck = { 
    
    id: string; 
    stem: string; 
    options: Option[] 
};
export type Lesson = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  quickChecks: QuickCheck[];
  checklist?: string[];
  hints?: string[];
};

export type Action = { 
    id: string; 
    label: string; 
    correct: boolean; 
    why: string 
};
export type Scenario = { 
    id: string; 
    title: string; 
    situation: string; 
    actions: Action[]; 
    notes?: string[] 
};

export type CourseContent = {
  title: string;
  lessons: Lesson[];
  scenarios?: Scenario[];
};

export type GateOptions = {
  /** LEGACY: if true, require correctness for lesson completion; if false, require reveal. */
  requireCorrectToComplete?: boolean;
  /** Require each lesson's MCQs to be answered, revealed AND correct to complete. */
  lessonCompletionMode?: 'answered' | 'revealed' | 'correct';
  /** Unlock Scenarios tab only after all lessons complete. */
  lockScenariosUntilLessonsDone?: boolean; // default true
   scenarioUnlockThreshold?: number;
};