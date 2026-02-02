"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const workspaces = [
  {
    id: 1,
    title: "Starter",
    description: "Up to 10,000 requests per day.",
    users: "Free",
  },
  {
    id: 2,
    title: "Premium",
    description: "500,000 requests per day¹",
    users: "$900/month²",
  },
  {
    id: 3,
    title: "Enterprise",
    description: "Based on your specific needs",
    users: "Custom",
  },
];

export default function FormLayout04() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <div className="flex items-center justify-center p-10">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-balance text-lg font-semibold text-foreground">
          Apply for early access
        </h3>
        <p className="text-pretty mt-1 text-sm leading-6 text-muted-foreground">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
        </p>
        <form action="#" method="post" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="first-name">
                  First name<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  required
                  placeholder="Emma"
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <Input
                  type="text"
                  id="last-name"
                  name="last-name"
                  autoComplete="family-name"
                  placeholder="Crown"
                />
              </Field>
            </div>
            <div className="col-span-full">
              <Field className="gap-2">
                <FieldLabel htmlFor="email">
                  Work email<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="emma@company.com"
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="company">Company</FieldLabel>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  placeholder="Company, Inc."
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="size">Company size (employees)</FieldLabel>
                <Select defaultValue="">
                  <SelectTrigger id="size" name="size">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-9">1-9</SelectItem>
                    <SelectItem value="10-50">10-50</SelectItem>
                    <SelectItem value="50-250">50-250</SelectItem>
                    <SelectItem value="250+">250+</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Separator className="col-span-full my-4" />
            <div className="col-span-full">
              <FieldLabel className="font-semibold text-foreground block mb-4">
                Select a workspace package
              </FieldLabel>

              <RadioGroup
                className="grid grid-cols-1 sm:grid-cols-3 gap-5"
                defaultValue={selectedWorkspace.id.toString()}
                onValueChange={(value) =>
                  setSelectedWorkspace(
                    workspaces.find(
                      (workspace) => workspace.id.toString() === value
                    ) || workspaces[0]
                  )
                }
              >
                {workspaces.map((item) => (
                  <div
                    key={item.id.toString()}
                    className="border-input has-data-[state=checked]:border-ring relative flex flex-col gap-2 rounded-md border p-4 shadow-xs outline-none"
                  >
                    <div className="flex justify-between">
                      <RadioGroupItem
                        id={item.id.toString()}
                        value={item.id.toString()}
                        className="order-1 after:absolute after:inset-0"
                      />

                      <FieldLabel
                        htmlFor={item.id.toString()}
                        className="block text-sm font-medium text-foreground"
                      >
                        {item.title}
                      </FieldLabel>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <p className="text-pretty mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <span className="mt-4 block text-sm font-medium text-foreground">
                        {item.users}
                      </span>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              <FieldDescription className="mt-2!">
                <sup>1</sup> $0.5/10K requests after limit reach.
              </FieldDescription>
              <FieldDescription className="mt-1">
                <sup>2</sup> No credit card required for registration.
              </FieldDescription>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="whitespace-nowrap"
            >
              Go back
            </Button>
            <Button type="submit" className="whitespace-nowrap">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
