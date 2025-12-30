import { forwardRef } from "react";
import { cn } from "~/lib/utils";

export interface CanvasGridProps extends React.SVGProps<SVGSVGElement> {}

const CanvasGrid = forwardRef<SVGSVGElement, CanvasGridProps>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      className={cn(`shrink-0`, className)}
      {...props}
    >
      <path
        id="base"
        d="M20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16H8H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8V16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8H16H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16V8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        id="border"
        d="M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M21 16V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H16M3 8V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H8M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        id="cross"
        d="M4 12H2M8 12H14H16M22 12H20M12 20V22M12 16V14V8M12 2V4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
);

CanvasGrid.displayName = "CanvasGrid";

export default CanvasGrid;
