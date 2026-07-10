'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const workspaces = [
  {
    id: 1,
    title: 'Starter',
    description: 'Up to 10,000 requests per day.',
    users: 'Free',
  },
  {
    id: 2,
    title: 'Premium',
    description: '500,000 requests per day¹',
    users: '$900/month²',
  },
  {
    id: 3,
    title: 'Enterprise',
    description: 'Based on your specific needs',
    users: 'Custom',
  },
];

export default function FormLayout04() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);

  return (
    <div className="flex items-center justify-center p-10">
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-balance font-semibold text-foreground text-lg">
          Apply for early access
        </h3>
        <p className="mt-1 text-pretty text-muted-foreground text-sm leading-6">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
        </p>
        <form action="#" className="mt-8" method="post">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="first-name">
                  First name<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  autoComplete="given-name"
                  id="first-name"
                  name="first-name"
                  placeholder="Emma"
                  required
                  type="text"
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <Input
                  autoComplete="family-name"
                  id="last-name"
                  name="last-name"
                  placeholder="Crown"
                  type="text"
                />
              </Field>
            </div>
            <div className="col-span-full">
              <Field className="gap-2">
                <FieldLabel htmlFor="email">
                  Work email<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  autoComplete="email"
                  id="email"
                  name="email"
                  placeholder="emma@company.com"
                  required
                  type="email"
                />
              </Field>
            </div>
            <div className="col-span-full sm:col-span-3">
              <Field className="gap-2">
                <FieldLabel htmlFor="company">Company</FieldLabel>
                <Input
                  autoComplete="organization"
                  id="company"
                  name="company"
                  placeholder="Company, Inc."
                  type="text"
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
              <FieldLabel className="mb-4 block font-semibold text-foreground">
                Select a workspace package
              </FieldLabel>

              <RadioGroup
                className="grid grid-cols-1 gap-5 sm:grid-cols-3"
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
                    className="relative flex flex-col gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-checked:border-ring"
                    key={item.id.toString()}
                  >
                    <div className="flex justify-between">
                      <RadioGroupItem
                        className="order-1 after:absolute after:inset-0"
                        id={item.id.toString()}
                        value={item.id.toString()}
                      />

                      <FieldLabel
                        className="block font-medium text-foreground text-sm"
                        htmlFor={item.id.toString()}
                      >
                        {item.title}
                      </FieldLabel>
                    </div>
                    <div className="flex h-full flex-col justify-between">
                      <p className="mt-1 text-pretty text-muted-foreground text-sm">
                        {item.description}
                      </p>
                      <span className="mt-4 block font-medium text-foreground text-sm">
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
              className="whitespace-nowrap"
              type="button"
              variant="outline"
            >
              Go back
            </Button>
            <Button className="whitespace-nowrap" type="submit">
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
