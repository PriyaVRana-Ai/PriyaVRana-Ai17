"use client"

import { useState } from "react"
import Sidebar from "../components/sidebar"
import Chat from "../components/chat"
import ImageAI from "../components/imageAi"

export default function Home() {
  const [active, setActive] = useState("Home")

  const [chat, setChat] = useState([
    {
      role: "assistant",
      content: "🙏 Radhe Radhe!\nPriyaVRana-AI में आपका हार्दिक स्वागत है।\nबताइए मैं आपकी कैसे मदद करूं?"
    }
  ])

  return (
    <div
      className="min-h-screen text-white bg-black"
      style={{
        background: "radial-gradient(circle at top, #25000b 0%, #0a0a0f 45%, #050507 100%)"
      }}
    >
      <Sidebar active={active} setActive={setActive} />

      {/* Yahi line change ki hai - Mobile + Desktop dono thik */}
      <main className="md:ml-64 pt-16 md:pt-6 min-h-screen p-6 md:p-10">

        {/* HOME */}
        {active === "Home" && (
          <section className="mx-auto max-w-6xl">
            <div
              className="rounded-3xl p-8 md:p-12 text-center"
              style={{
                background: "rgba(15,15,22,0.88)",
                border: "1px solid rgba(255,215,0,0.35)",
                boxShadow: "0 0 35px rgba(217,4,41,0.25)"
              }}
            >
              <div className="mb-4 text-5xl">👑</div>
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">PriyaVRana-AI</h1>
              <p className="mt-5 text-xl text-gray-300">सोचो • पूछो • पाओ</p>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                आपका Premium AI Assistant — Chat, Shayari, Study, Comedy, Image और कई AI tools एक ही जगह।
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              {["AI Chat", "Shayari AI", "Song AI", "Study AI", "Image AI", "Voice AI"].map((tool) => (
                <button
                  key={tool}
                  onClick={() => setActive(tool)}
                  className="rounded-2xl p-5 text-left hover:scale-[1.02] transition"
                  style={{ background: "rgba(20,20,28,0.9)", border: "1px solid rgba(255,215,0,0.15)" }}
                >
                  <div className="text-2xl">🤖</div>
                  <div className="mt-2 font-semibold text-yellow-400">{tool}</div>
                  <div className="text-sm text-gray-400">Open Tool</div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* AI CHAT */}
        {active === "AI Chat" && (
          <Chat chat={chat} setChat={setChat} />
        )}

        {/* IMAGE AI */}
        {active === "Image AI" && (
          <ImageAI />
        )}

        {/* OTHER TOOLS */}
        {!["Home", "AI Chat", "Image AI"].includes(active) && (
          <section className="flex min-h-[70vh] items-center justify-center">
            <div
              className="w-full max-w-2xl rounded-3xl p-10 text-center"
              style={{ background: "rgba(18,18,25,0.9)", border: "1px solid rgba(255,215,0,0.25)" }}
            >
              <div className="text-5xl">👑</div>
              <h1 className="mt-5 text-3xl font-bold text-yellow-400">{active}</h1>
              <p className="mt-4 text-gray-400">यह module अभी तैयार किया जा रहा है। जल्द आएगा।</p>
            </div>
          </section>
        )}

      </main>
    </div>
  )
}