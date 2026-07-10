'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Dialog08() {
  const [open, setOpen] = useState(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Deactivate 2FA
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-balance">
            Deactivate two-step authentication
          </AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            Enter your password to deactivate the two-step authentication login.
            Make sure to have your smartphone ready.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label className="font-medium text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              className="mt-2"
              disabled
              id="email"
              name="email"
              placeholder="ephraim@blocks.so"
              type="email"
            />
          </div>
          <div>
            <Label className="font-medium text-sm" htmlFor="password">
              Confirm password
            </Label>
            <div className="relative mt-2">
              <Input
                className="pe-9"
                id="password"
                name="password"
                placeholder="Password"
                required
                type={isVisible ? 'text' : 'password'}
              />
              <button
                aria-controls="password"
                aria-label={isVisible ? 'Hide password' : 'Show password'}
                aria-pressed={isVisible}
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md"
                onClick={toggleVisibility}
                type="button"
              >
                {isVisible ? (
                  <EyeOffIcon aria-hidden="true" size={16} />
                ) : (
                  <EyeIcon aria-hidden="true" size={16} />
                )}
              </button>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" variant="destructive">
              Deactivate
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
