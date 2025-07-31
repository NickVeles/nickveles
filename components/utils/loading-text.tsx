"use client";

import { ReactNode, useEffect, useState } from "react";

type LoadingTextProps = {
  children?: ReactNode;
}

export default function LoadingText({ children }: LoadingTextProps) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <p>{children ?? "Loading"}{dots}</p>
  )
}