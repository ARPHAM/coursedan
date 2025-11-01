import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}
