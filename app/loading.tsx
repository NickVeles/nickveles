"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 font-sans"
      style={{ height: "calc(100vh - 88px)" }}
    >
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      Loading{dots}
    </div>
  );
}
