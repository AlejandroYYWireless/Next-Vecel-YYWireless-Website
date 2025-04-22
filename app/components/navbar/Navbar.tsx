// Navbar.tsx
import React from "react";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import Footer from "../footer/Footer";

const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="sticky top-0 z-50 bg-transparent">
      {/* Hide mobile nav on medium screens and up */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Hide desktop nav on small screens */}
      <div className="hidden md:block">
        <DesktopNav />
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Navbar;
