"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Icons } from "@/components/icons";
import { Button } from "@/components/daisyui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/daisyui/dropdown";

import { themes } from "@/lib/theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [hasMounted, setHasMounted] = useState(false);
  // this line is the key to avoid the error.
  useEffect(() => setHasMounted(true));

  return (
    <DropdownMenu position={"end"} hover>
      <DropdownMenuTrigger>
        <Button outlined size="default" glass>
          <Icons.ColorSwatch size={20} />
          {hasMounted ? (
            <span className="hidden lg:block">{theme}</span>
          ) : (
            <span className="hidden lg:block">Theme</span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent height={"large"}>
        {themes &&
          themes.map((theme) => {
            return (
              <DropdownMenuItem
                key={theme.name}
                onClick={() => {
                  setTheme(theme.value);
                }}
              >
                <span
                  data-theme={theme.value}
                  className="bg-transparent text-inherit hover:bg-base-100"
                >
                  {theme.name}
                </span>
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
