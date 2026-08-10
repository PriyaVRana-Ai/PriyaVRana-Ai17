import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "PriyaVRana-AI",
  description: "AI Chat, Image, Shayari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className="min-h-screen bg-[#0A0A0F] text-white">
        <Sidebar />

        <main className="min-h-screen md:ml-64 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}