import Navbar from "@/components/daisyui/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="">{children}</main>;
}
