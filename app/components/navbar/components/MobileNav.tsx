"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { NavItem, navItems, NavSubLink } from "@/app/public/data/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-16 items-center justify-between px-4">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">YYWireless</span>
      </Link>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs">
          <SheetTitle className="font-bold text-xl">menu</SheetTitle>
          <SheetDescription>Servicing needs at any size</SheetDescription>
          <div className="flex flex-col gap-6 py-4">
            <nav className="flex flex-col gap-2a">
              {Object.entries(navItems).map(([key, item]) => (
                <MobileNavItem
                  key={key}
                  itemKey={key}
                  item={item}
                  setIsOpen={setIsOpen}
                />
              ))}
              <div className="self-end flex">
                <ModeToggle />
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const MobileNavItem = ({
  itemKey,
  item,
  setIsOpen,
}: {
  itemKey: string;
  item: NavItem;
  setIsOpen: (open: boolean) => void;
}) => {
  // If there are no subLinks or path is not null, render a simple link
  if (!item.subLinks || item.path) {
    return (
      <Link
        href={item.path || "#"}
        className="flex w-full items-center rounded-md p-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </Link>
    );
  }

  // If there are subLinks, render an accordion
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={itemKey} className="border-none">
        <AccordionTrigger className="py-2 px-4 pl-2 text-md hover:bg-accent hover:text-accent-foreground hover:no-underline rounded-md">
          {item.label}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-2 pl-4">
            {Object.entries(item.subLinks).map(([subKey, subItem]) => (
              <Link
                key={subKey}
                href={subItem.path || "#"}
                className="rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileNav;
