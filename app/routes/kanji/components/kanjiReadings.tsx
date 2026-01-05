import { Glasses } from "lucide-react";
import { Crate } from "~/components/primitives/Crate";
import { cn } from "~/lib/utils";

interface KanjiReadingsProps extends React.ComponentProps<"section"> {
  onyomi?: string[];
  kunyomi?: string[];
  nanori?: string[];
}

export default function KanjiReadings({
  onyomi,
  kunyomi,
  nanori,
  className,
  ...props
}: KanjiReadingsProps) {
  const readingTypes = [
    { label: "On'yomi", readings: onyomi },
    { label: "Kun'yomi", readings: kunyomi },
    { label: "Nanori", readings: nanori },
  ];

  return (
    <Crate className={cn(className)} {...props}>
      <Crate.Title>
        <Glasses />
        Readings
      </Crate.Title>
      <Crate.Content>
        {readingTypes.map(({ label, readings }) => (
          <Crate.Group key={label}>
            <Crate.GroupTitle>{label}</Crate.GroupTitle>
            <Crate.GroupContent>
              {readings && readings.length > 0 ? (
                <ul className="list-none flex flex-wrap content-start gap-1 p-1 overflow-y-scroll scrollbar">
                  {readings.map((reading, index) => (
                    <li
                      className="flex items-center rounded text-secondary-foreground bg-card px-3 h-7.5"
                      key={index}
                    >
                      {reading}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="grow flex items-center justify-center text-disabled">
                  No readings available.
                </span>
              )}
            </Crate.GroupContent>
          </Crate.Group>
        ))}
      </Crate.Content>
    </Crate>
  );
}
