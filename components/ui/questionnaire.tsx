'use client';

import { Questionnaire as QuestionnairePrimitive } from '@shadcn/react/questionnaire';
import { CheckIcon } from 'lucide-react';
import type * as React from 'react';
import { type Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Questionnaire({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      className={cn('flex w-full min-w-0 flex-col gap-4', className)}
      data-slot="questionnaire"
      {...props}
    />
  );
}

function QuestionnaireProgress({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      className={cn(
        'min-h-[1lh] w-fit min-w-[14ch] font-medium text-muted-foreground text-xs tabular-nums',
        className
      )}
      data-slot="questionnaire-progress"
      {...props}
    />
  );
}

function QuestionnaireItem({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      className={cn(
        'flex min-w-0 flex-col gap-4 border-0 p-0 outline-none',
        className
      )}
      data-slot="questionnaire-item"
      {...props}
    />
  );
}

function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      className={cn(
        'text-pretty font-medium text-base leading-snug [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4',
        className
      )}
      data-slot="questionnaire-title"
      {...props}
    />
  );
}

function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      className={cn('text-pretty text-muted-foreground text-sm', className)}
      data-slot="questionnaire-description"
      {...props}
    />
  );
}

function QuestionnaireChoices({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      className={cn(
        'group/questionnaire-choices grid min-w-0 gap-2',
        className
      )}
      data-slot="questionnaire-choices"
      {...props}
    />
  );
}

function QuestionnaireChoice({
  children,
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      className={cn(
        'group/questionnaire-choice relative flex min-h-11 cursor-pointer select-none items-start gap-2.5 rounded-lg border border-input bg-transparent px-3 py-2.5 text-start text-sm outline-none transition-colors hover:bg-muted/50 has-[>input:focus-visible]:border-ring has-[>input:focus-visible]:ring-3 has-[>input:focus-visible]:ring-ring/50 data-checked:border-primary/40 data-invalid:border-destructive data-checked:bg-muted dark:bg-input/20 dark:data-checked:bg-muted',
        'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className
      )}
      data-slot="questionnaire-choice"
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
        data-slot="questionnaire-choice-input"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[4px] border border-input group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[type=radio]/questionnaire-choice:rounded-full group-data-checked/questionnaire-choice:border-primary group-data-checked/questionnaire-choice:bg-primary group-data-checked/questionnaire-choice:text-primary-foreground dark:bg-input/30 dark:group-data-checked/questionnaire-choice:bg-primary"
        data-slot="questionnaire-choice-indicator"
      >
        <span
          className="hidden size-2 rounded-full bg-primary-foreground group-data-checked/questionnaire-choice:block group-data-[type=checkbox]/questionnaire-choice:hidden"
          data-slot="questionnaire-choice-indicator-dot"
        />
        <CheckIcon
          className="hidden size-3.5 group-data-checked/questionnaire-choice:block group-data-[type=radio]/questionnaire-choice:hidden"
          data-slot="questionnaire-choice-indicator-check"
        />
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        className="flex min-w-0 flex-1 flex-col gap-0.5 leading-snug"
        data-slot="questionnaire-choice-label"
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        className="pointer-events-none ms-auto hidden size-5 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-md border border-input bg-background font-medium font-mono text-[0.625rem] text-muted-foreground leading-none group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[shortcut]/questionnaire-choice:inline-flex"
        data-slot="questionnaire-choice-shortcut"
      />
    </QuestionnairePrimitive.Choice>
  );
}

function QuestionnaireChoiceDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('text-muted-foreground', className)}
      data-slot="questionnaire-choice-description"
      {...props}
    />
  );
}

function QuestionnaireInput({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <div
      className="group/questionnaire-input relative w-full min-w-0"
      data-slot="questionnaire-input-wrapper"
    >
      <QuestionnairePrimitive.Input
        className={cn(
          'h-8 min-h-11 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-[color,box-shadow,background-color] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 sm:min-h-0 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:disabled:bg-input/80',
          'selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground',
          className
        )}
        data-slot="questionnaire-input"
        {...props}
      />
    </div>
  );
}

function QuestionnaireError({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      className={cn('mt-2 text-destructive text-sm', className)}
      data-slot="questionnaire-error"
      {...props}
    />
  );
}

function QuestionnaireActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-8',
        className
      )}
      data-slot="questionnaire-actions"
      {...props}
    />
  );
}

function QuestionnairePrevious({
  children,
  className,
  size = 'default',
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous> &
  Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'>) {
  return (
    <QuestionnairePrimitive.Previous
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0',
        className
      )}
      data-size={size}
      data-slot="questionnaire-previous"
      data-variant={variant}
      {...props}
    >
      {children ?? 'Previous'}
    </QuestionnairePrimitive.Previous>
  );
}

function QuestionnaireSkip({
  children,
  className,
  size = 'default',
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip> &
  Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'>) {
  return (
    <QuestionnairePrimitive.Skip
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0',
        className
      )}
      data-size={size}
      data-slot="questionnaire-skip"
      data-variant={variant}
      {...props}
    >
      {children ?? 'Skip'}
    </QuestionnairePrimitive.Skip>
  );
}

function QuestionnaireNext({
  children,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next> &
  Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'>) {
  return (
    <QuestionnairePrimitive.Next
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
        className
      )}
      data-size={size}
      data-slot="questionnaire-next"
      data-variant={variant}
      {...props}
    >
      {children ?? 'Next'}
    </QuestionnairePrimitive.Next>
  );
}

function QuestionnaireSubmit({
  children,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit> &
  Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'>) {
  return (
    <QuestionnairePrimitive.Submit
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
        className
      )}
      data-size={size}
      data-slot="questionnaire-submit"
      data-variant={variant}
      {...props}
    >
      {children ?? 'Submit'}
    </QuestionnairePrimitive.Submit>
  );
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
};
