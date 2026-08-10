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

  // Yaha apni keys daal de
  const GROQ_KEY = "gsk_tumhari_groq_key_yaha";
  const STABILITY_KEY = "sk_tumhari_stability_key_yaha";

  const send = async () => {
    if (!msg.trim() &&!preview) return;

    const userMsg = { role: "user", content: msg, image: preview };
    const newChat = [...chat, userMsg];
    setChat(newChat);
    setMsg("");
    setPreview(null);
    setLoading(true);

    // Agar "Create image" ya image prompt hai to Stability use karo
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
        const aiReply = imageB64? `Image ready 👇` : "Image banane me error";

        setChat([...newChat, {
          role: "assistant",
          content: aiReply,
          image: imageB64? `data:image/png;base64,${imageB64}` : null
        }]);
      } catch (err) {
        setChat([...newChat, { role: "assistant", content: "Stability API Error: Key check karo" }]);
      }
    }
    // Baaki sab ke liye Groq
    else {
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

      {/* 1. SUGGESTIONS */}
      {chat.length <= 1 && (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">👑 PriyaVRana-AI</h1>
          <p className