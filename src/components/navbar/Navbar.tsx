import { Link } from "@heroui/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import ThemeSwitch from "@/components/themeSwitch/ThemeSwitch";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import useAuth from "@/context/useAuth";

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

type NavbarAvatarProps = {
  email: string;
  onLogout: () => void;
};

function NavbarAvatar({ email, onLogout }: NavbarAvatarProps) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={email}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-12">
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={onLogout}
        >
          Odhlásit
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const { isLoggedIn, email, setAuth } = useAuth();
  const navigate = useNavigate();

  function logoutHandler() {
    setAuth({ isLoggedIn: false, email: null });
    localStorage.removeItem("auth");
    navigate("/", { replace: true });
  }

  return (
    <NextUINavbar position="sticky">
      <NavbarMenuToggle className="md:hidden" />
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
        {isLoggedIn && email !== null ? (
          <NavbarAvatar email={email} onLogout={logoutHandler} />
        ) : (
          <Button as={Link} color="primary" href="/login" variant="flat">
            Přihlásit
          </Button>
        )}
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
