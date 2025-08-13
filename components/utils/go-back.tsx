"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  return (
    <Button variant="ghost" className="w-fit" onClick={() => router.back()}>
      <ArrowLeftIcon className="size-4" />
      Go Back
    </Button>
  );
}
