import LoadingText from "@/components/utils/loading-text";

export default function Loading() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 font-sans"
      style={{ minHeight: "calc(100vh - 68px)" }}
    >
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <LoadingText />
    </div>
  );
}
