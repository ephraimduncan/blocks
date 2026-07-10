'use client';

import { AppWindowIcon as Apps } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export default function Dialog11() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button />}>Initialize New Project</DialogTrigger>
      <DialogContent className="gap-0 overflow-visible p-0 sm:max-w-2xl">
        <DialogHeader className="mb-0 border-b px-6 py-4">
          <DialogTitle>Initialize New Project</DialogTitle>
        </DialogHeader>

        <form action="#" method="POST">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="flex flex-col justify-between md:w-80 md:border-r">
              <div className="flex-1 grow">
                <div className="border-t p-6 md:border-none">
                  <div className="flex items-center space-x-3">
                    <div className="inline-flex shrink-0 items-center justify-center rounded-sm bg-muted p-3">
                      <Apps
                        aria-hidden={true}
                        className="size-5 text-foreground"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-balance font-medium text-foreground text-sm">
                        Project Starter
                      </h3>
                      <p className="text-pretty text-muted-foreground text-sm">
                        Configure your new codebase
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <h4 className="text-balance font-medium text-foreground text-sm">
                    Description
                  </h4>
                  <p className="mt-1 text-pretty text-muted-foreground text-sm leading-6">
                    Quickly set up the foundational tools for your project.
                  </p>
                  <h4 className="mt-6 text-balance font-medium text-foreground text-sm">
                    Info
                  </h4>
                  <p className="mt-1 text-pretty text-muted-foreground text-sm leading-6">
                    Select your preferred stack and configurations.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t p-4">
                <DialogClose render={<Button type="button" variant="ghost" />}>
                  Cancel
                </DialogClose>
                <Button size="sm" type="submit">
                  Initialize
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-6 p-6 md:px-6 md:pt-6 md:pb-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-foreground text-sm">
                    1
                  </div>
                  <Label
                    className="font-medium text-foreground text-sm"
                    htmlFor="framework"
                  >
                    Select Framework
                  </Label>
                </div>
                <Select
                  defaultValue="react"
                  items={{
                    react: 'Next.js',
                    vue: 'React Router',
                    angular: 'Tanstack Start',
                    svelte: 'SvelteKit',
                    vanilla: 'SolidStart',
                  }}
                >
                  <SelectTrigger
                    className="w-full"
                    id="framework"
                    name="framework"
                  >
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">Next.js</SelectItem>
                    <SelectItem value="vue">React Router</SelectItem>
                    <SelectItem value="angular">Tanstack Start</SelectItem>
                    <SelectItem value="svelte">SvelteKit</SelectItem>
                    <SelectItem value="vanilla">SolidStart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-foreground text-sm">
                    2
                  </div>
                  <Label
                    className="font-medium text-foreground text-sm"
                    htmlFor="package-manager"
                  >
                    Choose Package Manager
                  </Label>
                </div>
                <Select
                  defaultValue="npm"
                  items={{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm', bun: 'bun' }}
                >
                  <SelectTrigger
                    className="w-full"
                    id="package-manager"
                    name="package-manager"
                  >
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="npm">npm</SelectItem>
                    <SelectItem value="yarn">yarn</SelectItem>
                    <SelectItem value="pnpm">pnpm</SelectItem>
                    <SelectItem value="bun">bun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-foreground text-sm">
                    3
                  </div>
                  <Label
                    className="font-medium text-foreground text-sm"
                    htmlFor="linter"
                  >
                    Configure Linter/Formatter
                  </Label>
                </div>
                <p className="mt-1 text-pretty text-muted-foreground text-xs">
                  Ensure code quality and consistency.
                </p>
                <Select
                  defaultValue="eslint-prettier"
                  items={{
                    'eslint-prettier': 'ESLint + Prettier',
                    eslint: 'ESLint Only',
                    prettier: 'Prettier Only',
                    biome: 'Biome',
                    oxlint: 'Oxlint',
                    none: 'None',
                  }}
                >
                  <SelectTrigger
                    className="mt-4 w-full"
                    id="linter"
                    name="linter"
                  >
                    <SelectValue placeholder="Select tools" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eslint-prettier">
                      ESLint + Prettier
                    </SelectItem>
                    <SelectItem value="eslint">ESLint Only</SelectItem>
                    <SelectItem value="prettier">Prettier Only</SelectItem>
                    <SelectItem value="biome">Biome</SelectItem>
                    <SelectItem value="oxlint">Oxlint</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-foreground text-sm">
                    4
                  </div>
                  <Label
                    className="font-medium text-foreground text-sm"
                    htmlFor="testing-tool"
                  >
                    Select Testing Tool
                  </Label>
                </div>
                <p className="mt-1 text-pretty text-muted-foreground text-xs">
                  Choose a framework for unit/integration tests.
                </p>
                <Select
                  defaultValue="jest"
                  items={{
                    jest: 'Jest',
                    vitest: 'Vitest',
                    cypress: 'Cypress',
                    none: 'None',
                  }}
                >
                  <SelectTrigger
                    className="mt-4 w-full"
                    id="testing-tool"
                    name="testing-tool"
                  >
                    <SelectValue placeholder="Select tool" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jest">Jest</SelectItem>
                    <SelectItem value="vitest">Vitest</SelectItem>
                    <SelectItem value="cypress">Cypress</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
