"use client";
import * as React from "react";
import { useState, Suspense, lazy } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { useSession } from "next-auth/react";

import { Button, buttonVariants } from "./button";
import { signOut } from "next-auth/react";
import Profile, { ProfileSkeleton } from "./profile";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { stat } from "fs";

//import ThemeToggle from "../theme-toggle";
const ThemeToggle = lazy(() => import("../theme-toggle"));

const navbarVariants = cva("navbar", {
  variants: {},
  defaultVariants: {},
});

const routeLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard", label: "Dashboard" },
];

interface NavbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarVariants> {}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, children, ...props }, ref) => {
    const { data: session, status } = useSession();
    const currentRoute = usePathname();
    const [mobileToggle, setMobileToggle] = useState(false);
    const handleMobileToggle = () => {
      setMobileToggle((prevState) => !prevState);
    };

    console.log(status);

    return (
      <div className="navbar relative bg-base-100 ">
        {/* Mobile Toggle */}
        <Button
          variant={"ghost"}
          shape={"circle"}
          className="lg:hidden"
          onClick={handleMobileToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </Button>
        <div className=" navbar-start flex-1">
          {/* <a className="btn-ghost btn text-xl normal-case">daisyUI</a> */}
          <Link
            className={cn(
              "text-xl normal-case",
              buttonVariants({ variant: "ghost" }),
            )}
            href={"/"}
          >
            BlogAI
          </Link>
        </div>
        {/* Desktop */}
        <nav className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {routeLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    `menu-item ${href === currentRoute ? "active" : ""}`,
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile */}
        {mobileToggle ? (
          <nav
            className={cn(
              `absolute left-0 top-full w-full bg-base-200 animate-in slide-in-from-bottom-80 lg:hidden`,
            )}
          >
            <ul className="menu menu-vertical px-1">
              {routeLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      `menu-item ${href === currentRoute ? "active" : ""}`,
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className=" gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input w-24 md:w-auto"
            />
          </div>
          <ThemeToggle />
          {status === "loading" && <ProfileSkeleton />}
          {status === "authenticated" && <Profile session={session} />}
          {status === "unauthenticated" && (
            <Link
              className={buttonVariants({ outlined: true })}
              href={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    );
  },
);

export default Navbar;

{
  /* <div ref={ref} className={cn(navbarVariants({ className }))} {...props}>
{children}
</div> */
}
