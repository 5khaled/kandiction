import { BookOpenText } from "lucide-react";
import { Crate } from "~/components/primitives/Crate";
import { cn } from "~/lib/utils";

interface KanjiMeaningsProps extends React.ComponentProps<"section"> {
  meanings?: string[];
}

export default function KanjiMeanings({
  meanings,
  className,
  ...props
}: KanjiMeaningsProps) {
  return (
    <Crate className={cn(className)} {...props}>
      <Crate.Title>
        <BookOpenText />
        Meanings
      </Crate.Title>
      <Crate.Content>
        <Crate.Group>
          <Crate.GroupContent>
            {meanings && meanings.length > 0 ? (
              <ul className="list-none flex flex-wrap content-start gap-1 p-1 overflow-y-scroll scrollbar">
                {meanings.map((meaning, index) => (
                  <li
                    className="font-light flex items-center rounded text-secondary-foreground bg-card px-3 h-7.5"
                    key={index}
                  >
                    {meaning}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="grow flex items-center justify-center text-disabled">
                No meanings available.
              </span>
            )}
          </Crate.GroupContent>
        </Crate.Group>
      </Crate.Content>
    </Crate>
  );
}
