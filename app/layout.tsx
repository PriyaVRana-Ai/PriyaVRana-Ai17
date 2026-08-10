import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "PriyaVRana-AI",
  description: "AI Chat, Image, Shayari",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Sidebar />
        <main className="md:ml-64 min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  );
}