'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Dialog01() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button variant="outline" />}>
        Show Dialog
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center sm:max-w-sm">
        <div className="flex justify-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <DialogHeader className="gap-0 text-center">
          <DialogTitle className="text-balance text-center">
            Payment successful
          </DialogTitle>
          <DialogDescription className="mx-auto mt-2 text-pretty text-center sm:max-w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full sm:justify-center">
          <DialogClose render={<Button className="w-full" />}>
            Go back to dashboard
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
