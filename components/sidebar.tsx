"use client"

const menu = [
  { name: "Home", icon: "🏠" },
  { name: "AI Chat", icon: "🤖" },
  { name: "Shayari AI", icon: "❤️" },
  { name: "Song AI", icon: "🎵" },
  { name: "Study AI", icon: "📚" },
  { name: "Comedy AI", icon: "😂" },
  { name: "Image AI", icon: "🎨" },
  { name: "Voice AI", icon: "🎤" },
  { name: "Script Writer", icon: "✍️" },
]

export default function Sidebar({ active, setActive }: any) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#171717] border-r border-white/10 p-3 flex flex-col">
      {/* Logo */}
      <div className="text-2xl font-bold text-yellow-400 mb-6 px-2">
        👑 PriyaVRana-AI
      </div>

      {/* Menu */}
      <div className="flex-1 space-y-1 overflow-y-auto">
        {menu.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition
              ${active === item.name
               ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 pt-3">
        <button className="w-full text-left text-gray-400 hover:text-white px-3 py-2 text-sm">
          Settings
        </button>
      </div>
    </aside>
  )
}