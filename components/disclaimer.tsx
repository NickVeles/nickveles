"use client";

import { ReactNode, useState } from "react";
import { CircleAlertIcon, InfoIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type DisclaimerProps = {
  children?: ReactNode;
  variant?: "default" | "primary" | "destructive";
};

export default function Disclaimer({
  children,
  variant = "default",
}: DisclaimerProps) {
  const [visible, setVisible] = useState(true);
  const iconStyle = "size-4 min-w-4 min-h-4";
  const discStyle =
    variant === "destructive"
      ? "bg-destructive text-destructive-foreground"
      : "bg-primary text-primary-foreground";

  if (!visible || !children) return null;

  return (
    <div
      className={cn(
        "w-full border-b flex justify-center items-center",
        discStyle
      )}
    >
      <div className="px-4 py-1 w-full flex justify-between items-center">
        <div className="flex items-center gap-1">
          {variant === "destructive" ? (
            <CircleAlertIcon className={iconStyle} />
          ) : (
            <InfoIcon className={iconStyle} />
          )}
          <p className="text-xs font-medium inline">{children}</p>
        </div>
        <Button
          onClick={() => setVisible(false)}
          aria-label="dismiss disclaimer"
          size="icon"
          variant="ghost"
          className="size-6 text-destructive-foreground hover:cursor-pointer hover:bg-background hover:text-destructive transition-colors"
        >
          <XIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
