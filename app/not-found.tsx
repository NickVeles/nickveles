import GoHomeButton from "@/components/utils/go-home-button";
import TextLink from "@/components/utils/text-link";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center text-center px-4 w-full"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      <div className="flex flex-col gap-12 max-w-[1200px]">
        <h1 className="text-4xl text-wrap font-bold text-destructive">
          404
        </h1>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-2xl text-wrap font-semibold text-foreground">
            Page not found
          </h2>
          <p className="">Check the URL or try again later &ndash; the page may be down temporarily or moved. <TextLink href="/contact">Contact me</TextLink> if you suspect something went wrong.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <GoHomeButton />
        </div>
      </div>
    </div>
  );
}
