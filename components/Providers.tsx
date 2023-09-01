"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
