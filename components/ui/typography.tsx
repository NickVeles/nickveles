import { cn } from "@/lib/utils";

type TypographyProps = {
  className?: string;
  children?: React.ReactNode;
};

export function SectionH({ className, children }: TypographyProps) {
  return (
    <h2
      className={cn(
        "w-full text-center font-bold text-wrap tracking-tighter text-4xl sm:text-5xl md:text-6xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
