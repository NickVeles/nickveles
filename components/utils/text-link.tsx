import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";

type TextLinkProps = {
  href: string;
  isIcon?: boolean;
  target?: string;
  children: React.ReactNode;
};

export default function TextLink({
  href,
  isIcon,
  target,
  children,
}: TextLinkProps) {
  return (
    <Link
      className="text-link visited:text-accent hover:underline"
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      translate="no"
    >
      {children}
      {isIcon && <IconExternalLink className="inline align-text-top size-4" />}
    </Link>
  );
}
