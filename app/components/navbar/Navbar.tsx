// Navbar.tsx
import React from "react";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";

const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="sticky top-0 z-50">
      {/* Hide mobile nav on medium screens and up */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Hide desktop nav on small screens */}
      <div className="hidden md:block">
        <DesktopNav />
      </div>

      {children}
    </div>
  );
};

export default Navbar;
