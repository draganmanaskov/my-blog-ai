import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "",
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      ghost: "btn-ghost",
      link: "btn-link",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },
    size: {
      default: "",
      xs: "btn-xs",
      sm: "btn-sm",
      lg: "btn-lg",
    },
    outlined: {
      true: "btn-outline",
    },
    responsive: {
      true: "btn-xs sm:btn-sm md:btn-md lg:btn-lg",
    },
    wide: {
      true: "btn-wide",
    },
    block: {
      true: "btn-block",
    },
    glass: {
      true: "glass",
    },
    noAnimation: {
      true: "no-animation",
    },

    shape: {
      square: "btn-square",
      circle: "btn-circle",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      outlined,
      responsive,
      wide,
      block,
      glass,
      shape,
      noAnimation,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            outlined,
            responsive,
            wide,
            block,
            glass,
            shape,
            noAnimation,

            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
