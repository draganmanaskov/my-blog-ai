import * as React from "react";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} tabIndex={0} className={cn(className)} {...props}>
    {children}
  </div>
));

export default DropdownMenuTrigger;
