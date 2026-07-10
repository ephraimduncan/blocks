'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Dialog03() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <div className="flex items-center justify-center py-36">
        <DialogTrigger render={<Button />}>Edit Profile</DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label className="font-medium text-sm" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="Your username"
            type="text"
          />
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
