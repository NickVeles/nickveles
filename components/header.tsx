import MobileMenu from "./utils/mobile-menu";

export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-sans">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Menu - Visible on mobile, hidden on sm+ */}
        <MobileMenu className="sm:hidden" />

        {/* Logo - Visible on sm+ */}
      </div>
    </header>
  );
}
