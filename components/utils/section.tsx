import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Section({
  id,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col justify-center items-center container gap-12",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
