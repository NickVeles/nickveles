import { Button } from "../ui/button";

export default function SkipNavigation() {
  return (
    <Button
      variant="secondary"
      className="fixed left-2 top-3.5 -translate-y-20 focus:translate-y-0 z-[100]"
      asChild
    >
      <a href="#main-content">Skip navigation</a>
    </Button>
  );
}
