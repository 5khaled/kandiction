import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm text-secondary-foreground whitespace-nowrap rounded-[calc(var(--radius)-1px)] disabled:pointer-events-none disabled:text-disabled disabled:shadow-none [&_svg]:fill-current/15 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 cursor-pointer active:*:scale-95 focus-visible:z-50 focus-visible:outline-1 outline-current -outline-offset-1 dark:-outline-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-card dark:bg-card text-primary border dark:border-ring dark:ring-ring shadow-[inset_0px_2px_0px_0px_#fff] active:shadow-[inset_0px_2px_0px_0px_var(--color-disabled)] dark:shadow-[inset_0px_0px_0px_1px_var(--color-border)] dark:active:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground border dark:border-ring dark:ring-ring shadow-[inset_0px_2px_0px_0px_#fff] active:shadow-[inset_0px_2px_0px_0px_var(--color-disabled)] dark:shadow-[inset_0px_0px_0px_1px_var(--color-border)] dark:active:shadow-none",
        destructive:
          "text-destructive bg-card border dark:border-ring dark:ring-ring shadow-[inset_0px_2px_0px_0px_#fff] active:shadow-[inset_0px_2px_0px_0px_var(--color-disabled)] dark:shadow-[inset_0px_0px_0px_1px_var(--color-border)] dark:active:shadow-none",
        outline: "border hover:bg-card/50",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4.5",
        sm: "text-xs h-6.5 gap-1 px-3.5 has-[svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        default:
          "text-sm h-9 gap-1.5 px-4 has-[svg]:px-3 [&_svg:not([class*='size-'])]:size-4.5",
        lg: "text-base h-9 gap-2.5 px-5 has-[svg]:px-3.5 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
