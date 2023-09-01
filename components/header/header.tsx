"use client";

import Link from "next/link";
import { FC } from "react";

import { buttonVariants } from "@/components/daisyui/button";
import ThemeToggle from "../theme-toggle";
import NavMenu from "./nav-menu";

import { useSession } from "next-auth/react";

const Header: FC = () => {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between bg-black px-4 py-3 sm:px-6 lg:px-10">
      <h1>Logo</h1>
      <div className="flex gap-4">
        {!session ? (
          <Link className={buttonVariants({ outlined: true })} href={"/login"}>
            Login
          </Link>
        ) : (
          <Link className={buttonVariants({ outlined: true })} href={"/logout"}>
            Logout
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
