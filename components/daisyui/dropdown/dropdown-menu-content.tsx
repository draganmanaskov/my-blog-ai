import * as React from "react";
import { FC } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const dropdownMenuContnentVariants = cva(
  "dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52 flex-nowrap overflow-y-auto ",
  {
    variants: {
      height: {
        default: "",
        small: "h-48",
        medium: "h-64",
        large: "h-96",
      },
    },
    defaultVariants: {
      height: "default",
    },
  }
);

interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof dropdownMenuContnentVariants> {}

const DropdownMenuContent = React.forwardRef<
  HTMLUListElement,
  DropdownMenuContentProps
>(({ className, children, height, ...props }, ref) => (
  <ul
    ref={ref}
    tabIndex={0}
    className={cn(dropdownMenuContnentVariants({ height }), className)}
    {...props}
  >
    {children}
  </ul>
));

export default DropdownMenuContent;
