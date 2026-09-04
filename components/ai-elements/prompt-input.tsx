'use client';

import type { ChatStatus, FileUIPart } from 'ai';
import { CornerDownLeftIcon, Loader2Icon, SquareIcon, XIcon } from 'lucide-react';
import {
  Children,
  type ComponentProps,
  type FormEvent,
  type HTMLAttributes,
  type KeyboardEventHandler,
  useState,
} from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

export type PromptInputMessage = {
  text: string;
  files: FileUIPart[];
};

export type PromptInputProps = Omit<
  HTMLAttributes<HTMLFormElement>,
  'onSubmit'
> & {
  onSubmit: (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
};

export const PromptInput = ({
  className,
  onSubmit,
  children,
  ...props
}: PromptInputProps) => (
  <form
    className={cn('w-full', className)}
    onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      void onSubmit(
        { text: String(data.get('message') ?? ''), files: [] },
        event
      );
    }}
    {...props}
  >
    <InputGroup className="overflow-hidden">{children}</InputGroup>
  </form>
);

export type PromptInputTextareaProps = ComponentProps<
  typeof InputGroupTextarea
>;

export const PromptInputTextarea = ({
  className,
  placeholder = 'What would you like to know?',
  ...props
}: PromptInputTextareaProps) => {
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    props.onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      event.key !== 'Enter' ||
      event.shiftKey ||
      isComposing ||
      event.nativeEvent.isComposing
    ) {
      return;
    }

    event.preventDefault();
    const button = event.currentTarget.form?.querySelector(
      'button[type="submit"]'
    );
    if (!(button instanceof HTMLButtonElement) || !button.disabled) {
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <InputGroupTextarea
      className={cn('field-sizing-content max-h-48 min-h-16', className)}
      name="message"
      onCompositionEnd={() => setIsComposing(false)}
      onCompositionStart={() => setIsComposing(true)}
      {...props}
      onKeyDown={handleKeyDown}
    />
  );
};

export type PromptInputFooterProps = Omit<
  ComponentProps<typeof InputGroupAddon>,
  'align'
>;

export const PromptInputFooter = ({
  className,
  ...props
}: PromptInputFooterProps) => (
  <InputGroupAddon
    align="block-end"
    className={cn('justify-between gap-1', className)}
    {...props}
  />
);

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div className={cn('flex items-center gap-1', className)} {...props} />
);

export type PromptInputButtonProps = ComponentProps<typeof InputGroupButton>;

export const PromptInputButton = ({
  variant = 'ghost',
  className,
  size,
  ...props
}: PromptInputButtonProps) => (
  <InputGroupButton
    className={cn(className)}
    size={size ?? (Children.count(props.children) > 1 ? 'sm' : 'icon-sm')}
    type="button"
    variant={variant}
    {...props}
  />
);

export type PromptInputSubmitProps = ComponentProps<typeof InputGroupButton> & {
  status?: ChatStatus;
};

export const PromptInputSubmit = ({
  className,
  variant = 'default',
  size = 'icon-sm',
  status,
  children,
  ...props
}: PromptInputSubmitProps) => {
  let icon = <CornerDownLeftIcon className="size-4" />;

  if (status === 'submitted') {
    icon = <Loader2Icon className="size-4 animate-spin" />;
  } else if (status === 'streaming') {
    icon = <SquareIcon className="size-4" />;
  } else if (status === 'error') {
    icon = <XIcon className="size-4" />;
  }

  return (
    <InputGroupButton
      aria-label="Submit"
      className={cn(className)}
      size={size}
      type="submit"
      variant={variant}
      {...props}
    >
      {children ?? icon}
    </InputGroupButton>
  );
};
