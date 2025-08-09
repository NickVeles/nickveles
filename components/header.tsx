import { AccessibilityButton } from "./accessibility/accessibility-button";
import Disclaimer from "./disclaimer";
import MobileMenu from "./utils/mobile-menu";
import PCMenu from "./utils/pc-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-sans">
      <Disclaimer variant="destructive">
        This website is a{" "}
        <span className="inline font-bold">WORK IN PROGRESS (WIP)</span> and
        contains mockup data &ndash; be welcome to reach out to me and provide
        feedback.
      </Disclaimer>
      <div className="flex h-(--header-height) items-center px-4 gap-1">
        <div className="flex flex-1">
          <MobileMenu className="sm:hidden h-10 w-10" />
          <PCMenu className="hidden sm:flex" />
        </div>
        <AccessibilityButton className="h-10 w-10" />
      </div>
    </header>
  );
}
