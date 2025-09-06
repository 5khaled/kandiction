import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(`flex items-center rounded text-nowrap`, {
  variants: {
    variant: {
      default: "bg-border text-secondary-foreground",
      primary: "bg-primary",
      outline:
        "bg-input text-secondary-foreground outline outline-border -outline-offset-1",
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
  return (
    <span
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </span>
  );
}
