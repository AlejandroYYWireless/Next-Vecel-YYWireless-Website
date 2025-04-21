"use client";
// DesktopNav.tsx
import React from "react";
import Link from "next/link";
import { navItems, NavItem, NavSubLink } from "@/app/public/data/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";

const DesktopNav = () => {
  return (
    <div className="container mx-auto flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">YYWireless</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {Object.entries(navItems).map(([key, item]) => (
            <NavItemComponent key={key} itemKey={key} item={item} />
          ))}
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

const NavItemComponent = ({
  itemKey,
  item,
}: {
  itemKey: string;
  item: NavItem;
}) => {
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
