import LoadingText from "@/components/utils/loading-text";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

type LoadingProps = {
  showLoadingText?: boolean;
  loadingText?: string;
  className?: string;
};

export default function Loading({
  showLoadingText,
  loadingText,
  className,
}: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-sans">
      <LoaderCircleIcon className={cn("size-12 animate-spin", className)} />
      {showLoadingText && <LoadingText>{loadingText}</LoadingText>}
    </div>
  );
}
