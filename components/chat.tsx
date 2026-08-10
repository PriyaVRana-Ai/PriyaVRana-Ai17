import { useState, useRef } from "react";

const suggestions = [
  { icon: "🖼️", text: "Create image" },
  { icon: "📄", text: "Write anything" },
  { icon: "✨", text: "Boost my day" },
  { icon: "📚", text: "Help me learn" },
];

export default function Chat({ chat, setChat, loading }: any) {
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const send = () => {
    if (!msg &&!preview) return;
    setChat([...chat, { role: "user", content: msg, image: preview }]);
    setMsg("");
    setPreview(null);
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col h-full">
      {/* 1. SUGGESTIONS - Sirf jab chat khali ho */}
      {chat.length === 0 && (
        <div className="flex-1 flex-col justify-center px-4">
          <h1 className="text-2xl font-bold mb-6">Hi Vivu</h1>
          <p className="text-3xl font-semibold mb-8">Where should we start?</p>
          <div className="space-y-3">
            {suggestions.map((s) => (
              <button
                key={s.text}
                onClick={() => setMsg(s.text)}
                className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-full transition"
              >
                <span>{s.icon}</span>
                <span>{s.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CHAT MESSAGES */}
      {chat.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chat.map((m: any, i: number) => (
            <div key={i} className={`flex ${m.role === "user"? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "user"? "bg-[#D90429] text-white" : "bg-white/10 text-gray-200"}`}>
                {m.image && (
                  <img
                    src={m.image}
                    className="rounded-2xl mb-2 w-52 h-auto object-cover cursor-pointer"
                    onClick={() => window.open(m.image, "_blank")}
                  />
                )}
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. INPUT AREA - Gemini wala */}
      <div className="p-3 bg-black/40 backdrop-blur-xl border-t border-white/10">

        {/* CHHOTI PHOTO PREVIEW */}
        {preview && (
          <div className="relative inline-block mb-2">
            <img src={preview} className="h-12 w-12 rounded-lg object-cover"/>
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-2 -right-2 bg-black rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >×</button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* + BUTTON */}
          <button onClick={() => fileRef.current?.click()} className="p-2 hover:bg-white/10 rounded-full">
            +
          </button>
          <input type="file" ref={fileRef} onChange={handleFile} className="hidden" accept="image/*"/>

          {/* INPUT BOX */}
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask PriyaVRana AI"
            className="flex-1 bg-white/10 rounded-full px-4 py-3 outline-none"
            onKeyDown={(e) => e.key === "Enter" && send()}
          />

          {/* SEND BUTTON */}
          <button
            onClick={send}
            disabled={loading}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}