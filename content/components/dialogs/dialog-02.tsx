"use client";

import { Button } from "@/components/ui/button";
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
import { Check } from "lucide-react";
import { useState } from "react";

export default function Dialog04() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm flex flex-col items-center">
        <div className="flex justify-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <DialogHeader className="text-center gap-0">
          <DialogTitle className="text-center">Payment successful</DialogTitle>
          <DialogDescription className="mt-2 text-center mx-auto sm:max-w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:gap-3 w-full gap-2">
          <DialogClose asChild>
            <Button variant="default" className="w-full sm:w-1/2">
              Deactivate
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-1/2">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
