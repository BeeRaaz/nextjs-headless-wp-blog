"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Articles",
      href: "/articles",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  return (
    <>
      <header className="flex flex-wrap items-center justify-center fixed top-5 left-0 z-999 w-full lg:w-120">
        <nav
          aria-label="Main Navigation"
          className="bg-background py-4 px-6 rounded-[999px]"
        >
          {navLinks && (
            <ul className="flex flex-wrap items-center gap-6">
              {navLinks.map((navLink) => (
                <li key={navLink.name}>
                  <Link
                    href={navLink.href}
                    className={`${pathname === navLink.href ? "text-foreground" : "text-foreground-04"} font-semibold leading-2 tracking-tight text-sm hover:text-foreground transition-colors duration-300`}
                  >
                    {navLink.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>
    </>
  );
}
