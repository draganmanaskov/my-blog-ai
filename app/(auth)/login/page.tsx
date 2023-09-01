import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/daisyui/button";
import { UserAuthForm } from "./components/user-auth-form";
import Icons from "@/components/icons";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <div className=" flex w-full items-center justify-center border-2 p-8 md:p-0">
      {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative grid h-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-2 top-2 md:right-8 md:top-8",
          )}
        >
          Register
        </Link> */}

        <div className="bg-muted relative hidden h-full  flex-col p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="relative lg:p-8">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute -top-40 left-2 md:-top-20 md:left-8",
            )}
          >
            <Icons.ChevronLeft className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute -top-40 right-2 md:-top-20 md:right-8",
            )}
          >
            Register
          </Link>

          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
              <p className="text-muted-foreground text-sm">
                Enter your email and password below to log in to your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
