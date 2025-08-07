import { cn } from "@/lib/utils";
import { AppearingDiv } from "./appearing-div";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  disableAnims?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function Section({
  id,
  disableAnims,
  className,
  children,
  ...props
}: SectionProps) {
  const refinedClassName = cn("w-full flex flex-col px-4", className);

  return (
    <section id={id} className="container last:mb-32" {...props}>
      {disableAnims ? (
        <div className={refinedClassName}>{children}</div>
      ) : (
        <AppearingDiv className={refinedClassName}>{children}</AppearingDiv>
      )}
    </section>
  );
}
