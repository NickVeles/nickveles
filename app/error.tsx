"use client";

import { Button } from "@/components/ui/button";
import GoHomeButton from "@/components/utils/go-home-button";
import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex items-center justify-center text-center px-4 w-full"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      <div className="flex flex-col gap-12 max-w-[1200px]">
        <h1 className="text-4xl text-wrap font-bold text-destructive">
          Something went wrong
        </h1>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl text-wrap font-semibold text-foreground">
            {error.name}
          </h2>
          <p className="">{error.message || "An unexpected error occurred."}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <Button
            variant="secondary"
            onClick={() => reset()}
            className="w-1/2 sm:w-auto"
          >
            Try again
          </Button>
          <GoHomeButton />
        </div>
      </div>
    </div>
  );
}
