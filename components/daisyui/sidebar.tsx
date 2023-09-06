import { FC } from "react";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { sidebarLinks } from "@/lib/navigation/sidebarLinks";

interface sidebarProps {
  children: React.ReactNode;
}

const Sidebar: FC<sidebarProps> = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Header content here*/}
        <div className="sticky  top-0 w-full bg-base-100 bg-opacity-20 lg:hidden">
          <label
            htmlFor="my-drawer-2"
            className={cn(
              " drawer-button",
              buttonVariants({ variant: "ghost" }),
            )}
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
          </label>
        </div>
        {/* Main contetn here */}
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-56 bg-base-200 p-4 text-base-content">
          {/* Sidebar content here */}
          {sidebarLinks.map((link) => {
            return (
              <li key={link.title}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
