"use client";

import { ReactNode, useState } from "react";
import { CircleAlertIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";

type DisclaimerProps = {
  children?: ReactNode;
};

export default function Disclaimer({ children }: DisclaimerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible || !children) return null;

  return (
    <div className="w-full bg-destructive border-b text-destructive-foreground flex justify-center items-center">
      <div className="px-4 py-1 w-full flex justify-between items-center">
        <p className="text-xs font-medium inline pt-0.5">
          <CircleAlertIcon className="size-4 inline mr-1 mb-0.5" />
          {children}
        </p>
        <Button
          onClick={() => setVisible(false)}
          aria-label="dismiss disclaimer"
          size="icon"
          variant="ghost"
          className="size-6 text-destructive-foreground hover:cursor-pointer hover:bg-background hover:text-destructive transition-colors"
        >
          <XIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
