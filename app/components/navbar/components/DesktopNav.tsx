"use client";
// DesktopNav.tsx
import { NavItem, navItems } from "@/app/public/data/navigation";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const DesktopNav = () => {
  const theme = useTheme();
  const isDarkmode =
    theme.theme === "dark" ||
    (theme.theme === "system" && theme.systemTheme === "dark");
  console.log(theme.systemTheme);

  return (
    <>
      {/* Fixed navbar container */}
      <div className="fixed top-0 left-0 right-0 z-[52] bg-background shadow-sm">
        <div className="container mx-auto flex h-24 items-center justify-between">
          <Link href="/" className="flex space-x-2">
            <img
              src={`${
                isDarkmode
                  ? "/images/logolargedark.png"
                  : "/images/logolarge.png"
              }`}
              className="h-20 me-3"
              alt="YYWireless Logo"
            />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {Object.entries(navItems).map(([key, item]) => (
                <NavItemComponent key={key} item={item} />
              ))}
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Scroll progress indicator positioned directly under the navbar */}
        <ScrollProgress className="h-1" />
      </div>

      {/* Spacer to prevent content from being hidden under the fixed navbar */}
      <div className="h-24"></div>
    </>
  );
};

const NavItemComponent = ({ item }: { item: NavItem }) => {
  // If there are no subLinks or path is not null, render a simple link
  if (!item.subLinks || item.path) {
    return (
      <NavigationMenuItem>
        <Link href={item.path || "#"} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {item.label}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  }

  // Otherwise render a dropdown with subLinks
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          {Object.entries(item.subLinks).map(([subKey, subItem]) => (
            <li key={subKey} className="row-span-3">
              <NavigationMenuLink asChild>
                <Link
                  href={subItem.path || "#"}
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                >
                  <div className="text-sm font-medium leading-none">
                    {subItem.label}
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default DesktopNav;
