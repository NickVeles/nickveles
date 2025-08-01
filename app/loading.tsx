import LoadingText from "@/components/utils/loading-text";

type LoadingProps = {
  showLoading?: boolean;
};

export default function Loading({ showLoading }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-sans">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      {showLoading && <LoadingText />}
    </div>
  );
}
