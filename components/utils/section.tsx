import { AppearingDiv } from "./appearing-div";

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
      className="container"
      {...props}
    >
      <AppearingDiv className={className}>{children}</AppearingDiv>
    </section>
  );
}
