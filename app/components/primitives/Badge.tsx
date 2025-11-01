import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { cn } from "~/lib/utils";

const badgeVariants = cva(`flex items-center rounded text-nowrap`, {
  variants: {
    variant: {
      default: "bg-border text-secondary-foreground",
      primary: "bg-primary text-foreground",
      outline:
        "bg-input text-secondary-foreground outline outline-border -outline-offset-1",
      kbd: "bg-border text-secondary-foreground shadow-[inset_0px_-2px_0_0px_rgba(0,0,0,0.25)]",
    },
    size: {
      sm: "[&>svg]:size-2.5 gap-0.5 py-px px-1 text-[0.625rem]",
      default: "[&>svg]:size-3 gap-1 py-0.5 px-1.5 text-xs",
      lg: "[&>svg]:size-3.5 gap-1 py-0.5 px-2 text-sm",
      icon: "[&>svg]:size-4 p-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default function Badge({
  variant,
  size,
  children,
  className,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  const [isHolding, setisHolding] = useState(false);

  if (variant === "kbd") {
    useHotkeys(
      String(children),
      () => {
        setisHolding(true);
      },
      {
        preventDefault: true,
        enableOnFormTags: true,
        keydown: true,
      },
    );

    useHotkeys(
      String(children),
      () => {
        setisHolding(false);
      },
      {
        preventDefault: true,
        enableOnFormTags: true,
        keyup: true,
      },
    );
  }

  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "kbd" ? (
        <kbd className={cn(`-translate-y-px`, isHolding ? "text-primary" : "")}>
          {children}
        </kbd>
      ) : (
        children
      )}
    </span>
  );
}
