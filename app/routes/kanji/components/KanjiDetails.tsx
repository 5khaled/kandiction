import { cloneElement, type ReactElement, type ReactNode } from "react";
import ordinal from "ordinal";
import { cn } from "~/lib/utils";

import {
  LineSquiggle,
  ChartColumn,
  FileBadge,
  School,
  Sprout,
} from "lucide-react";

interface KanjiDetailsData {
  Strokes?: number | null;
  Frequency?: number | null;
  JLPT?: string | null;
  Grade?: number | null;
  Radical?: string | null;
}

interface KanjiDetailsConfig {
  icon: ReactNode;
  title: string;
  getValue: (data: KanjiDetailsData) => string | null;
}

const KANJI_DETAILS_CONFIGS: KanjiDetailsConfig[] = [
  {
    icon: <LineSquiggle />,
    title: "Strokes",
    getValue: (data) => data.Strokes?.toString() ?? null,
  },
  {
    icon: <ChartColumn />,
    title: "Frequency",
    getValue: (data) => (data.Frequency ? `#${data.Frequency}` : null),
  },
  {
    icon: <FileBadge />,
    title: "JLPT",
    getValue: (data) => data.JLPT ?? null,
  },
  {
    icon: <School />,
    title: "Grade",
    getValue: (data) => (data.Grade ? `${ordinal(data.Grade)} Grade` : null),
  },
  {
    icon: <Sprout />,
    title: "Radical",
    getValue: (data) => data.Radical ?? null,
  },
];

interface KanjiDetailsProps extends React.ComponentProps<"section"> {
  data: KanjiDetailsData | null;
}

export default function KanjiDetails({
  data,
  className,
  ...props
}: KanjiDetailsProps) {
  if (!data) return null;

  return (
    <section className={cn(`px-3 py-1`, className)} {...props}>
      {KANJI_DETAILS_CONFIGS.map((config, index) => {
        const iconElement = config.icon as ReactElement<{ className?: string }>;
        const value = config.getValue(data);

        return (
          <div
            key={index}
            className="flex items-center justify-between gap-3 text-sm py-2 not-last:border-b border-card font-light leading-tight"
          >
            <div className="flex gap-1.5">
              {cloneElement(iconElement, {
                className: cn(
                  "text-primary size-4 fill-current/25",
                  iconElement.props.className,
                ),
              })}
              <div className="text-foreground">{config.title}</div>
            </div>
            {value ? (
              <div className="text-secondary-foreground text-nowrap">
                {value}
              </div>
            ) : (
              <div className="text-muted-foreground">N/A</div>
            )}
          </div>
        );
      })}
    </section>
  );
}
