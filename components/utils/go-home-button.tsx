"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function GoHomeButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/")} className="w-1/2 sm:w-auto">
      Go back to Home
    </Button>
  );
}
