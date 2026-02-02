"use client";

import { Plus, UserRoundIcon, X } from "lucide-react";
import { useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dialog12() {
  const [open, setOpen] = useState(true);
  const [authorName, setAuthorName] = useState("Ephraim Duncan");
  const [title, setTitle] = useState("Design Engineer");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        alert("File size exceeds 1MB limit");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 rounded-3xl gap-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-balance font-medium">Add a writer</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 px-6 pt-4 pb-6">
          <div className="flex flex-col items-center justify-center  md:col-span-2">
            <div className="relative mb-2">
              <Avatar className="h-24 w-24 border-2 border-muted">
                <AvatarImage src={image || undefined} alt="Profile" />
                <AvatarFallback>
                  <UserRoundIcon
                    size={52}
                    className="text-muted-foreground"
                    aria-hidden="true"
                  />
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute -top-0.5 -right-0.5 bg-accent rounded-full border-[3px] border-background hover:bg-accent"
                onClick={() => {
                  if (image) {
                    setImage(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  } else {
                    triggerFileInput();
                  }
                }}
              >
                {image ? (
                  <X className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Plus className="h-3 w-3 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {image ? "Remove image" : "Upload image"}
                </span>
              </Button>
            </div>

            <p className="text-pretty text-center font-medium">Upload Image</p>
            <p className="text-pretty text-center text-sm text-muted-foreground">
              Max file size: 1MB
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={triggerFileInput}
            >
              Add Image
            </Button>
          </div>

          <div className="flex flex-col justify-between md:col-span-3">
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="author-name" className="flex items-center">
                  Author name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="author-name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center">
                  <Label htmlFor="title">Title</Label>
                </div>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
