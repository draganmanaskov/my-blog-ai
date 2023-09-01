import * as React from "react";
import { FC } from "react";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const dropdownVariants = cva("dropdown", {
  variants: {
    position: {
      default: "",
      end: "dropdown-end",
      top: "dropdown-top",
      bottom: "dropdown-bottom",
      left: "dropdown-left",
      right: "dropdown-right",
    },
    hover: {
      true: "dropdown-hover",
    },
    open: {
      true: "dropdown-open",
    },
  },
  defaultVariants: {
    position: "default",
  },
});

interface DropdownMenuProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownVariants> {}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, position, hover, open, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dropdownVariants({ position, hover, open, className }))}
      {...props}
    >
      {children}
    </div>
  )
);

export default DropdownMenu;

{
  /* <label tabIndex={0} className="btn m-1">
Hover
</label>
<ul
tabIndex={0}
className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
>
<li>
  <a>Item 1</a>
</li>
<li>
  <a>Item 2</a>
</li>
</ul> */
}
