// navigation.ts
export type NavSubLink = {
  label: string;
  path: string;
  subLinks: Record<string, NavSubLink> | null;
};

export type NavItem = {
  label: string;
  path: string | null;
  subLinks: Record<string, NavSubLink> | null;
};

export const navItems: Record<string, NavItem> = {
  home: {
    label: "Home",
    path: "/",
    subLinks: null,
  },
  // wholesale: {
  //   label: "Wholesale",
  //   path: null,
  //   subLinks: {
  //     "contact-us": {
  //       label: "Contact Us",
  //       path: "/wholesale/contact-us",
  //       subLinks: null,
  //     },
  //     deals: {
  //       label: "Current Deals",
  //       path: "/wholesale/current-deals",
  //       subLinks: null,
  //     },
  //   },
  // },
  about: {
    label: "About",
    path: "/about-us",
    subLinks: null,
  },
};
