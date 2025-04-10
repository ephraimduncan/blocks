"use client";

import { UserPlus } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const members = [
  {
    name: "Ephraim Duncan",
    email: "ephraim@documenso.com",
    avatarUrl: "https://blocks.so/avatar-01.png",
    initials: "ED",
    status: "member",
  },
  {
    name: "Lucas Smith",
    email: "lucas@documenso.com",
    avatarUrl: "https://blocks.so/avatar-03.png",
    initials: "LS",
    status: "member",
  },
  {
    name: "Timur Ercan",
    email: "timur@documenso.com",
    avatarUrl: "https://blocks.so/avatar-02.jpg",
    initials: "TE",
    status: "member",
  },
  {
    name: "Catalin Pit",
    email: "catalin@documenso.com",
    avatarUrl: "https://blocks.so/avatar-04.jpg",
    initials: "CP",
    status: "member",
  },
];

export default function Dialog07() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Invite members</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-foreground">
            Invite members
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-muted-foreground">
            Add new team members to your workspace. Please consider your
            organization&apos;s policies when adding external people.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex w-full items-center space-x-2">
            <div className="relative flex-1">
              <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="inviteEmail"
                className="h-10 pl-9"
                placeholder="Add email..."
                type="email"
              />
            </div>
            <Button type="submit" className="h-10">
              Invite
            </Button>
          </div>
        </form>
        <h4 className="mt-4 text-sm font-medium text-foreground">
          People with existing access
        </h4>
        <ul className="divide-y">
          {members.map((member) => (
            <li
              key={member.name}
              className="flex items-center justify-between py-2.5"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">
                  {member.name}
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-background text-xs font-medium"
              >
                {member.status}
              </Badge>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
