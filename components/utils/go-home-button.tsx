"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function GoHomeButton() {
  return (
    <Button>
      <Link href="/">Go back to Home</Link>
    </Button>
  );
}
