import LoadingText from "@/components/utils/loading-text";
import { cn } from "@/lib/utils";

type LoadingProps = {
  showLoadingText?: boolean;
  className?: string;
};

export default function Loading({ showLoadingText, className }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-sans">
      <div className={cn("w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin", className)} />
      {showLoadingText && <LoadingText />}
    </div>
  );
}
