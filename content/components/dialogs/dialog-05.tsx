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

export default function Dialog05() {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete Workspace
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-balance">
            Delete workspace
          </AlertDialogTitle>
          <AlertDialogDescription className="text-pretty">
            All workspace data will be permanently deleted. There is no coming
            back after you press delete.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <Label className="font-medium text-sm" htmlFor="delete-workspace">
              Confirm password
            </Label>
            <div className="relative mt-2">
              <Input
                className="pe-9"
                id="delete-workspace"
                name="delete-workspace"
                placeholder="Password"
                required
                type={isVisible ? 'text' : 'password'}
              />
              <button
                aria-controls="delete-workspace"
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
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" variant="destructive">
              Delete workspace permanently
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
