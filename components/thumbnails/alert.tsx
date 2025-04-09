import { JSX, SVGProps } from "react";

export const AlertThumbnail = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg width="296" height="141" viewBox="0 0 296 141" fill="none" {...props}>
    <path d="M89.5 60C89.5 56.9624 91.9624 54.5 95 54.5H201C204.038 54.5 206.5 56.9624 206.5 60V81C206.5 84.0376 204.038 86.5 201 86.5H95C91.9624 86.5 89.5 84.0376 89.5 81V60Z" />
    <path
      d="M89.5 60C89.5 56.9624 91.9624 54.5 95 54.5H201C204.038 54.5 206.5 56.9624 206.5 60V81C206.5 84.0376 204.038 86.5 201 86.5H95C91.9624 86.5 89.5 84.0376 89.5 81V60Z"
      className="stroke-border dark:stroke-border"
    />
    <circle
      cx="105"
      cy="70"
      r="6"
      className="fill-yellow-500 dark:fill-yellow-400"
    />
    <rect
      x="117"
      y="66"
      width="72"
      height="4"
      rx="2"
      className="fill-muted-foreground"
    />
    <rect
      x="117"
      y="73"
      width="52"
      height="3"
      rx="1.5"
      className="fill-border"
    />
  </svg>
);
