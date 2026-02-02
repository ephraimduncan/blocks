"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { Check, CircleCheck, ExternalLink } from "lucide-react";
import { useState } from "react";

const highlights = [
  {
    id: 1,
    feature: "Used by top design teams worldwide",
  },
  {
    id: 2,
    feature: "Seamless integration with design tools",
  },
  {
    id: 3,
    feature: "Real-time collaboration features",
  },
];

const plans = [
  {
    name: "Creator",
    features: [
      { feature: "Up to 3 design projects" },
      { feature: "Basic collaboration tools" },
      { feature: "5GB cloud storage" },
      { feature: "Community forum support" },
    ],
    price: "$15",
    href: "#",
    isRecommended: false,
  },
  {
    name: "Team",
    features: [
      { feature: "Unlimited design projects" },
      { feature: "Advanced collaboration suite" },
      { feature: "50GB cloud storage" },
      { feature: "Priority email support" },
    ],
    price: "$49",
    href: "#",
    isRecommended: true,
  },
  {
    name: "Agency",
    features: [
      { feature: "Unlimited projects and team members" },
      { feature: "Client portal access" },
      { feature: "250GB cloud storage" },
      { feature: "White-labeling options" },
      { feature: "Dedicated account manager" },
    ],
    price: "$99",
    href: "#",
    isRecommended: false,
  },
];

export default function FormLayout05() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="flex items-center justify-center p-10">
      <form className="sm:mx-auto sm:max-w-7xl">
        <h3 className="text-balance text-xl font-semibold text-foreground">
          Create new design workspace
        </h3>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="mt-6 lg:col-span-7">
            <div className="space-y-4 md:space-y-6">
              <div className="md:flex md:items-center md:space-x-4">
                <div className="md:w-1/4">
                  <Field className="gap-2">
                    <FieldLabel htmlFor="organization">Organization</FieldLabel>
                    <Select defaultValue="1">
                      <SelectTrigger
                        id="organization"
                        name="organization"
                        className="w-full"
                      >
                        <SelectValue placeholder="Select organization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Acme, Inc.</SelectItem>
                        <SelectItem value="2">Hero Labs</SelectItem>
                        <SelectItem value="3">Rose Holding</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="mt-4 md:mt-0 md:w-3/4">
                  <Field className="gap-2">
                    <FieldLabel htmlFor="workspace">Workspace name</FieldLabel>
                    <Input id="workspace" name="workspace" />
                  </Field>
                </div>
              </div>
              <div>
                <Field className="gap-2">
                  <FieldLabel htmlFor="region">Region</FieldLabel>
                  <Select defaultValue="iad1">
                    <SelectTrigger id="region" name="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fra1">
                        eu-central-1 (Frankfurt, Germany)
                      </SelectItem>
                      <SelectItem value="iad1">
                        us-east-1 (Washington, D.C., USA)
                      </SelectItem>
                      <SelectItem value="lhr1">
                        eu-west-2 (London, United Kingdom)
                      </SelectItem>
                      <SelectItem value="sfo1">
                        us-west-1 (San Francisco, USA)
                      </SelectItem>
                      <SelectItem value="sin1">
                        ap-southeast-1 (Singapore)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    For best performance, choose a region closest to your
                    operations
                  </FieldDescription>
                </Field>
              </div>
            </div>
            <h4 className="text-balance mt-14 font-medium">
              Plan type<span className="text-red-500">*</span>
            </h4>
            <RadioGroup
              value={selected.name}
              onValueChange={(value) =>
                setSelected(
                  plans.find((plan) => plan.name === value) || plans[0]
                )
              }
              className="mt-4 space-y-4"
            >
              {plans.map((plan) => (
                <label
                  key={plan.name}
                  htmlFor={plan.name}
                  className={cn(
                    "relative block cursor-pointer rounded-md border bg-background transition",
                    selected.name === plan.name
                      ? "border-primary/20 ring-2 ring-primary/20"
                      : "border-border"
                  )}
                >
                  <div className="flex items-start space-x-4 px-6 py-4">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <RadioGroupItem value={plan.name} id={plan.name} />
                    </div>
                    <div className="w-full">
                      <p className="text-pretty leading-6">
                        <span className="font-semibold text-foreground">
                          {plan.name}
                        </span>
                        {plan.isRecommended && (
                          <Badge variant="secondary" className="ml-2">
                            recommended
                          </Badge>
                        )}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check
                              className="h-4 w-4 text-muted-foreground"
                              aria-hidden={true}
                            />
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-b-md border-t border-border bg-muted px-6 py-3">
                    <a
                      href={plan.href}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline hover:underline-offset-4"
                    >
                      Learn more
                      <ExternalLink className="h-4 w-4" aria-hidden={true} />
                    </a>
                    <div>
                      <span className="text-lg font-semibold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="lg:col-span-5">
            <Card className="bg-muted">
              <CardContent>
                <h4 className="text-balance text-sm font-semibold text-foreground">
                  Choose the right plan for your design team
                </h4>
                <p className="text-pretty mt-2 text-sm leading-6 text-muted-foreground">
                  Our flexible plans are designed to scale with your team&apos;s
                  needs. All plans include core design collaboration features
                  with varying levels of storage and support.
                </p>
                <ul className="mt-4 space-y-1">
                  {highlights.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-2 py-1.5 text-foreground"
                    >
                      <CircleCheck className="h-5 w-5 text-primary" />
                      <span className="truncate text-sm">{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-primary"
                >
                  Learn more
                  <ExternalLink className="h-4 w-4" aria-hidden={true} />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator className="my-10" />
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
}
