import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BlogAI",
  description: "Create your own blog with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(" antialiased", inter.className)}
      suppressHydrationWarning
    >
      <body className="relative min-h-screen ">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
