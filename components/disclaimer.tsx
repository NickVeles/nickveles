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
  const disclaimerStyle =
    variant === "destructive"
      ? "bg-destructive text-destructive-foreground"
      : "bg-primary text-primary-foreground";
  const dismissStyle =
    variant === "destructive"
      ? "text-destructive-foreground hover:text-destructive"
      : "text-primary-foreground hover:text-primary-highlighter";

  if (!visible || !children) return null;

  return (
    <div
      className={cn(
        "w-full border-b flex justify-center items-center",
        disclaimerStyle
      )}
    >
      <div className="px-4 py-1 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
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
          className={`size-6 hover:cursor-pointer hover:bg-background transition-colors ${dismissStyle}`}
        >
          <XIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
