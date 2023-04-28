export interface Links {
  label: string;
  href: string;
}

export const allLinks = [
  { label: "Home", href: "/" },
  { label: "Novels", href: "/novels" },
  { label: "Comics", href: "/comics" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/about" },
];

const [Home, Novels, Comics, Blog, Sobre] = allLinks;
export const defaultTabs = [Home, Novels, Comics, Blog, Sobre];
export const mobileTabs = [Novels, Comics, Blog];
