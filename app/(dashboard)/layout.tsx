import Navbar from "@/components/daisyui/navbar";
import Sidebar from "@/components/daisyui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar>
        <main>{children}</main>
      </Sidebar>
    </>
  );
}
