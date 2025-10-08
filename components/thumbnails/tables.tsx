import { JSX, SVGProps } from "react";

export const TablesThumbnail = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg width="296" height="141" viewBox="0 0 296 141" fill="none" {...props}>
    {/* Add your custom SVG content here */}
    <rect x="50" y="40" width="196" height="61" rx="8" fill="#8952E0" />
    <rect x="70" y="60" width="156" height="21" rx="4" fill="white" />
  </svg>
);
