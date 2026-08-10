  {/* Mobile Overlay */}
  {open && (
    <div
      onClick={closeSidebar}
      className="fixed inset-0 z-40 bg-black/70 md:hidden"
    />
  )}

  {/* Sidebar */}
  <aside
    className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-yellow-400/20 bg-[#0A0A0F] p-5 text-white shadow-2xl transition-transform duration-300 ${
      open ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0`}
  >
    {/* Logo / Name */}
    <div className="mb-8 border-b border-white/10 pb-5">
      <h1 className="text-xl font-bold text-yellow-400">
        👑 PriyaVRana-AI
      </h1>

      <p className="mt-1 text-xs text-gray-400">
        Your AI Assistant
      </p>
    </div>

    {/* Navigation */}
    <nav className="flex flex-col gap-2">

      <Link
        href="/"
        onClick={closeSidebar}
        className="rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-yellow-400"
      >
        🏠 Home
      </Link>

      <Link
        href="/chat"
        onClick={closeSidebar}
        className="rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-yellow-400"
      >
        🤖 AI Chat
      </Link>

      <Link
        href="/image"
        onClick={closeSidebar}
        className="rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-yellow-400"
      >
        🖼️ Image AI
      </Link>

      <Link
        href="/shayari"
        onClick={closeSidebar}
        className="rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-yellow-400"
      >
        ❤️ Shayari AI
      </Link>

    </nav>

    {/* Bottom */}
    <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-yellow-400/10 bg-white/5 p-3">
      <p className="text-center text-xs text-gray-400">
        PriyaVRana-AI
      </p>
    </div>
  </aside>
</>