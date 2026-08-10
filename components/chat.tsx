"use client";

import { useState, useRef } from "react";

const suggestions = [
  { icon: "🖼️", text: "Create image" },
  { icon: "📄", text: "Write anything" },
  { icon: "✨", text: "Boost my day" },
  { icon: "📚", text: "Help me learn" },
];

export default function Chat({ chat, setChat }: any) {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const GROQ_KEY = process.env.NEXT_PUBLIC_GROQ_KEY; 
const STABILITY_KEY = process.env.NEXT_PUBLIC_STABILITY_KEY;

  const send = async () => {
    if (!msg.trim() && !preview) return;
    
    const userMsg = { role: "user", content: msg, image: preview };
    const newChat = [...chat, userMsg];
    setChat(newChat);
    setMsg("");
    setPreview(null);
    setLoading(true);

    if (msg.toLowerCase().includes("image") || msg.toLowerCase().includes("create")) {
      try {
        const res = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${STABILITY_KEY}`,
            "Accept": "application/json"
          },
          body: JSON.stringify({
            text_prompts: [{ text: msg }],
            cfg_scale: 7,
            steps: 30,
          })
        });
        const data = await res.json();
        const imageB64 = data.artifacts?.[0]?.base64;
        const aiReply = imageB64 ? `Image ready 👇` : "Image banane me error";
        
        setChat([...newChat, { 
          role: "assistant", 
          content: aiReply, 
          image: imageB64 ? `data:image/png;base64,${imageB64}` : null 
        }]);
      } catch (err) {
        setChat([...newChat, { role: "assistant", content: "Stability API Error: Key check karo" }]);
      }
    } else {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.1-70b-versatile",
            messages: [
              { role: "system", content: "You are PriyaVRana-AI, a helpful and friendly AI assistant. Reply in Hinglish." },
              ...newChat.map((m: any) => ({ role: m.role, content: m.content }))
            ]
          })
        });
        const data = await res.json();
        const aiReply = data.choices?.[0]?.message?.content || "Sorry, kuch error aa gayi";
        
        setChat([...newChat, { role: "assistant", content: aiReply }]);
      } catch (err) {
        setChat([...newChat, { role: "assistant", content: "Groq API Error: Key check karo bhai" }]);
      }
    }

    setLoading(false);
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-transparent text-white">

      {chat.length <= 1 && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">👑 PriyaVRana-AI</h1>
          <p className="text-xl font-semibold mb-4">Where should we start?</p>
          <div className="grid grid-cols-2 gap-3">
            {suggestions.map((s) => (
              <button
                key={s.text}
                onClick={() => setMsg(s.text)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-2xl transition text-left"
              >
                <span className="text-xl">{s.icon}</span>
                <span className="text-sm">{s.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.map((m: any, i: number) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-[#D90429] text-white" : "bg-white/10 text-gray-200"}`}>
              {m.image && <img src={m.image} className="rounded-2xl mb-2 w-52 h-auto object-cover"/>}
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-400">PriyaVRana-AI typing...</p>}
      </div>

      <div className="p-3 bg-black/60 backdrop-blur-xl border-t border-white/10">
        {preview && (
          <div className="relative inline-block mb-2">
            <img src={preview} className="h-16 w-16 rounded-xl object-cover"/>
            <button onClick={() => setPreview(null)} className="absolute -top-2 -right-2 bg-black rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button onClick={() => fileRef.current?.click()} className="p-3 hover:bg-white/10 rounded-full text-xl">+</button>
          <input type="file" ref={fileRef} onChange={handleFile} className="hidden" accept="image/*"/>

          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask PriyaVRana AI"
            className="flex-1 bg-white/10 rounded-full px-4 py-3 outline-none placeholder:text-gray-400"
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={loading}
          />

          <button onClick={send} disabled={loading} className="p-3 bg-white rounded-full hover:bg-gray-200 disabled:opacity-50 text-black">➤</button>
        </div>
      </div>
    </div>
  );
}