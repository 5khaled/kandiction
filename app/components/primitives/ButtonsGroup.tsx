import { cn } from "~/lib/utils";

interface ButtonsGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function ButtonsGroup({
  children,
  className,
  ...props
}: ButtonsGroupProps) {
  return (
    <div
      className={cn(
        "flex rounded -space-x-px *:rounded-none *:first:rounded-l-[calc(var(--radius)-1px)] *:last:rounded-r-[calc(var(--radius)-1px)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
