import { useState } from "react";
import { cn } from "~/lib/utils";

interface SegmentedControlProps {
  segments: { id: string; label: string; disabled: boolean }[];
}

export default function SegmentedControl({ segments }: SegmentedControlProps) {
  const [activeSegment, setActiveSegment] = useState(segments[0].id);

  const activeIndex = segments.findIndex(
    (segment) => segment.id === activeSegment
  );
  return (
    <div
      className="relative grid border rounded bg-border overflow-hidden"
      style={{ gridTemplateColumns: `repeat(${segments.length}, 1fr)` }}
    >
      {segments.map((segment) => (
        <button
          tabIndex={activeSegment === segment.id ? -1 : 0}
          key={segment.id}
          onClick={() => {
            !segment.disabled && setActiveSegment(segment.id);
          }}
          className={cn(
            "h-7.5 relative z-10 px-3 py-1.5 text-xs rounded-[calc(var(--radius)-1px)] outline-0 focus-visible:text-primary",
            segment.disabled
              ? "text-muted-foreground/25 cursor-not-allowed"
              : activeSegment === segment.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div>{segment.label}</div>
        </button>
      ))}

      <span
        className={cn(
          `highlight absolute inset-0 bg-card rounded-[calc(var(--radius)-1px)] transition-transform ease-out`
        )}
        style={{
          width: `calc(${100 / segments.length}% - 0px)`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
    </div>
  );
}
