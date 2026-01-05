import { cn } from "~/lib/utils";

export function Crate({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `flex flex-col border rounded bg-card overflow-hidden`,
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export const CrateTitle = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <h2
      {...props}
      className={cn(
        `bg-muted flex items-center border-b gap-2 px-3 py-2 font-medium`,
        `[&>svg]:size-4 [&>svg]:text-primary [&>svg]:fill-current/25`,
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const CrateContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div {...props} className={cn(`flex flex-col gap-3 m-2`, className)}>
      {children}
    </div>
  );
};

export const CrateGroup = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div {...props} className={cn(`grow flex flex-col gap-1`, className)}>
      {children}
    </div>
  );
};

export const CrateGroupTitle = ({
  children,
  className,
  ...props
}: React.ComponentProps<"h3">) => {
  return (
    <h3
      {...props}
      className={cn(`text-sm text-secondary-foreground font-medium`, className)}
    >
      {children}
    </h3>
  );
};

export const CrateGroupContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        `relative flex bg-background rounded-xl min-h-17.75 sm:max-h-20`,
        className,
      )}
    >
      {children}
    </div>
  );
};

Crate.Title = CrateTitle;
Crate.Content = CrateContent;
Crate.Group = CrateGroup;
Crate.GroupTitle = CrateGroupTitle;
Crate.GroupContent = CrateGroupContent;
