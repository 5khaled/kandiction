import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { cn } from "~/lib/utils";
import Badge from "~/components/primitives/Badge";

export default function SearchBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useHotkeys(
    "ctrl+k, cmd+k",
    () => {
      if (document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    },
    { preventDefault: true, enableOnFormTags: true },
  );
  useHotkeys(
    "esc",
    () => {
      if (document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    },
    { preventDefault: true, enableOnFormTags: true },
  );

  return (
    <div
      className={cn(
        `relative overflow-hidden flex border bg-input focus-within:outline outline-foreground/15 -outline-offset-1 rounded`,
        searchTerm ? "" : "flex-row-reverse",
        className,
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className={cn(
          `peer text-sm grow py-1.5 placeholder:text-disabled rounded-l outline-0`,
          searchTerm ? "pl-2" : "pl-1.5",
        )}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {!searchTerm && (
        <span className="peer-focus:opacity-0 flex gap-1 absolute right-0 mr-1.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Badge variant={"default"} size={"default"} className="">
            CTRL
          </Badge>
          <Badge variant={"default"} size={"default"} className="">
            K
          </Badge>
        </span>
      )}
      <button
        tabIndex={searchTerm ? 0 : -1}
        className={cn(
          `group/button flex items-center justify-center outline-none`,
          searchTerm
            ? [
                "px-1.5 cursor-pointer text-muted-foreground",
                "focus-visible:*:first:scale-105 focus-visible:active:*:first:scale-95 focus-visible:text-primary hover:text-primary",
              ]
            : "pl-1.5 text-disabled",
        )}
      >
        <Search
          className={cn(
            `size-4`,
            searchTerm
              ? "fill-current/25 group-hover/button:scale-105 group-active/button:scale-95"
              : "",
          )}
        />
      </button>
    </div>
  );
}
