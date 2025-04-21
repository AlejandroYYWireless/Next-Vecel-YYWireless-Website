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
  wholesale: {
    label: "Wholesale",
    path: null,
    subLinks: {
      "contact-us": {
        label: "Contact Us",
        path: "/contact-us",
        subLinks: null,
      },
      pricing: {
        label: "Pricing",
        path: "/pricing",
        subLinks: null,
      },
    },
  },
  about: {
    label: "About",
    path: "/about",
    subLinks: null,
  },
  blog: {
    label: "Blog",
    path: "/blog",
    subLinks: null,
  },
};
