import * as React from "react";

import { cn } from "@/lib/utils";

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const DropdownMenuItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={cn(className)} {...props}>
      {children}
    </li>
  )
);

export default DropdownMenuItem;
