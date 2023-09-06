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
        <main className=" w-full p-4">{children}</main>
      </Sidebar>
    </>
  );
}
