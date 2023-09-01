import Navbar from "@/components/daisyui/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="absolute w-full">
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}
