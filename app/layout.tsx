import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-black text-white">
        <Sidebar />
        <main className="md:ml-64 p-4">  {/* desktop pe sidebar ki jagah chhodi */}
          {children}
        </main>
      </body>
    </html>
  );
}