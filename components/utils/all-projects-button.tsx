"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AllProjectsButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="w-fit"
      onClick={() => router.push("/portfolio")}
    >
      <ArrowLeftIcon className="size-4" />
      All Projects
    </Button>
  );
}
