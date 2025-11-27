"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";

export function ScenarioOverlay({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className="flex flex-col items-center justify-center gap-4 bg-black/40 border-none text-center backdrop-blur-xl max-w-sm shadow-xl [&>button:first-of-type]:hidden">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
        <p className="text-white text-sm font-medium">
          Submitting scenario and generating feedback...
        </p>
      </DialogContent>
    </Dialog>
  );
}
