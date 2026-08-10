"use client"

const items = [
  "Home",
  "AI Chat",
  "Shayari AI",
  "Song AI",
  "Study AI",
  "Comedy AI",
  "Image AI",
  "Voice AI",
  "Script Writer",
  "Video Ideas",
  "Caption",
  "Reply",
  "Translator",
  "Settings",
  "Admin Panel"
]

export default function Sidebar({
  active,
  setActive
}: {
  active: string
  setActive: (s: string) => void
}) {
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r border-yellow-500/20 bg-black/90 p-4">

      <div className="mb-6">
        <p className="text-sm font-semibold text-yellow-400">
          👑 AI MENU
        </p>
      </div>

      {items.map((item) => (
        <button
          key={item}
          onClick={() => setActive(item)}
          className={`mb-1 w-full rounded-xl px-4 py-3 text-left font-medium transition ${
            active === item
              ? "bg-red-700 text-white shadow-[0_0_20px_rgba(217,4,41,0.5)]"
              : "text-gray-300 hover:bg-red-950 hover:text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </aside>
  )
}