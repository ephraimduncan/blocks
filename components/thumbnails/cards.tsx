import { JSX, SVGProps } from "react";

export const CardsThumbnail = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg width="296" height="141" viewBox="0 0 296 141" fill="none" {...props}>
    <path
      d="M97.5 45C97.5 41.9624 99.9624 39.5 103 39.5H193C196.038 39.5 198.5 41.9624 198.5 45V96C198.5 99.0376 196.038 101.5 193 101.5H103C99.9624 101.5 97.5 99.0376 97.5 96V45Z"
      className="fill-card"
    />
    <path
      d="M97.5 45C97.5 41.9624 99.9624 39.5 103 39.5H193C196.038 39.5 198.5 41.9624 198.5 45V96C198.5 99.0376 196.038 101.5 193 101.5H103C99.9624 101.5 97.5 99.0376 97.5 96V45Z"
      className="stroke-border dark:stroke-border"
    />
    <rect
      x="112"
      y="54"
      width="12"
      height="12"
      rx="3"
      className="fill-muted"
    />
    <path
      d="M116.5 57.5L118 59L119.5 57.5"
      className="stroke-muted-foreground"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M118 62C118 61.4477 118.448 61 119 61C119.552 61 120 61.4477 120 62C120 62.5523 119.552 63 119 63C118.448 63 118 62.5523 118 62Z"
      className="fill-muted-foreground"
    />
    <path
      d="M116 62C116 61.4477 116.448 61 117 61C117.552 61 118 61.4477 118 62C118 62.5523 117.552 63 117 63C116.448 63 116 62.5523 116 62Z"
      className="fill-muted-foreground"
    />
    <rect
      x="131"
      y="56"
      width="24"
      height="3"
      rx="1.5"
      className="fill-muted-foreground"
    />
    <rect
      x="131"
      y="62"
      width="36"
      height="2"
      rx="1"
      className="fill-muted"
    />
    <path
      d="M183.5 57C183.5 56.1716 184.172 55.5 185 55.5H188C188.828 55.5 189.5 56.1716 189.5 57V60C189.5 60.8284 188.828 61.5 188 61.5H185C184.172 61.5 183.5 60.8284 183.5 60V57Z"
      className="fill-muted"
    />
    <path
      d="M186.5 58L187 58.5L187.5 58"
      className="stroke-muted-foreground"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <rect
      x="112"
      y="76"
      width="72"
      height="2"
      rx="1"
      className="fill-muted"
    />
    <rect
      x="112"
      y="81"
      width="58"
      height="2"
      rx="1"
      className="fill-muted"
    />
    <rect
      x="112"
      y="86"
      width="48"
      height="2"
      rx="1"
      className="fill-muted"
    />
  </svg>
);