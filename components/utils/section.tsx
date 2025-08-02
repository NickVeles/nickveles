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
        "flex flex-col justify-center items-center w-full p-4 sm:py-4 sm:px-[clamp(1rem,5vw,8rem)] gap-12",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
