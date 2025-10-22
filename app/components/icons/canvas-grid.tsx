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
      <path d="M3.27423 3.27423C3.66319 2.88527 4.19074 2.66675 4.74082 2.66675H19.2593C19.8094 2.66675 20.337 2.88527 20.7259 3.27423C21.1149 3.66319 21.3334 4.19074 21.3334 4.74082V19.2593C21.3334 19.8094 21.1149 20.337 20.7259 20.7259C20.337 21.1149 19.8094 21.3334 19.2593 21.3334H4.74082C4.19074 21.3334 3.66319 21.1149 3.27423 20.7259C2.88527 20.337 2.66675 19.8094 2.66675 19.2593V4.74082C2.66675 4.19074 2.88527 3.66319 3.27423 3.27423Z"></path>
      <path
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H8M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M21 16V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H16"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12H2M10 12H8M16 12H14M22 12H20M12 20V22M12 14V16M12 8V10M12 2V4"
      ></path>
    </svg>
  ),
);

CanvasGrid.displayName = "CanvasGrid";

export default CanvasGrid;
