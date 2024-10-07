import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import ThemeSwitch from "@/components/themeSwitch/ThemeSwitch";
import { useLocation } from "react-router-dom";

const navbarItems = [
  {
    label: "Domů",
    href: "/",
  },
  {
    label: "Cviky",
    href: "/exercises",
  },
  {
    label: "Tréninkové plány",
    href: "/training-plans",
  },
  {
    label: "Tréninky",
    href: "/workout-sessions",
  },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <NextUINavbar position="sticky">
      <NavbarBrand className="gap-3 max-w-fit">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          href="/"
        >
          <p className="font-bold text-inherit">GymTracker</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <div className="hidden md:flex gap-4 justify-start ml-2">
          {navbarItems.map((item) => (
            <NavbarItem key={item.href} isActive>
              <Link
                data-active={pathname === item.href ? true : false}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-bold"
                )}
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className=" basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle className="md:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navbarItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} isActive>
              <Link
                data-active={pathname === item.href ? true : false}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-bold"
                )}
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
