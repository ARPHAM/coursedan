import Footer from "@/components/footer";
import Header from "@/components/header";
import NavbarMain from "@/components/navbarMain";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <NavbarMain />
      <main>{children}</main>
      <Footer />
    </>
  );
}
