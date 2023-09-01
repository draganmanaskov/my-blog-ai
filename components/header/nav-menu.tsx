import { FC } from "react";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavMenuProps {}

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Team",
    href: "/team",
  },
];

const NavMenu: FC<NavMenuProps> = ({}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map((link) => {
          return (
            <NavigationMenuItem key={link.name}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
