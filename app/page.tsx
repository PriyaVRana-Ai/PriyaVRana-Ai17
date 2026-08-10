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
      content:
        "🙏 Radhe Radhe!\nPriyaVRana-AI में आपका हार्दिक स्वागत है।"
    }
  ])

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, #25000b 0%, #0a0a0f 45%, #050507 100%)"
      }}
    >
      <Sidebar active={active} setActive={setActive} />

      <main className="ml-64 min-h-screen p-6 md:p-10">
        
        {/* HOME */}
        {active === "Home" && (
          <section className="mx-auto max-w-6xl">
            <div
              className="rounded-3xl p-8 md:p-12 text-center"
              style={{
                background: "rgba(15,15,22,0.88)",
                border: "1px solid rgba(255,215,0,0.35)",
                boxShadow:
                  "0 0 35px rgba(217,4,41,0.25), inset 0 0 30px rgba(255,215,0,0.04)"
              }}
            >
              <div className="mb-4 text-5xl">👑</div>
<p
  className="mb-4 text-2xl md:text-3xl font-bold"
  style={{
    color: "#FFD700",
    textShadow: "0 0 15px rgba(217,4,41,0.7)"
  }}
>
  🙏 जय श्री राम
</p>
              <h1
                className="text-4xl md:text-6xl font-bold"
                style={{
                  color: "#FFD700",
                  textShadow: "0 0 20px rgba(217,4,41,0.8)"
                }}
              >
                PriyaVRana-AI
              </h1>

              <p className="mt-5 text-xl md:text-2xl text-gray-300">
                सोचो • पूछो • पाओ
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                आपका Premium AI Assistant — Chat, Shayari, Study,
                Comedy, Image और कई AI tools एक ही जगह।
              </p>

              <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["🤖", "AI Chat", "AI से बातचीत करें"],
                  ["❤️", "Shayari AI", "दिल की बात शायरी में"],
                  ["🎵", "Song AI", "नए गाने और ideas"],
                  ["📚", "Study AI", "पढ़ाई में मदद"],
                  ["😂", "Comedy AI", "Funny content बनाएं"],
                  ["🎨", "Image AI", "AI images बनाएं"]
                ].map(([icon, title, desc]) => (
                  <button
                    key={title}
                    onClick={() => setActive(title)}
                    className="rounded-2xl p-6 text-left transition hover:scale-[1.02]"
                    style={{
                      background: "rgba(25,25,34,0.9)",
                      border: "1px solid rgba(255,215,0,0.22)",
                      boxShadow: "0 0 18px rgba(217,4,41,0.12)"
                    }}
                  >
                    <div className="text-3xl">{icon}</div>

                    <h2 className="mt-3 text-xl font-bold text-white">
                      {title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      {desc}
                    </p>
                  </button>
                ))}
              </div>

              <div
                className="mt-10 rounded-2xl p-5"
                style={{
                  background: "rgba(217,4,41,0.08)",
                  border: "1px solid rgba(217,4,41,0.35)"
                }}
              >
                <p className="text-lg text-gray-200">
                  👑 <span className="font-semibold text-yellow-400">
                    Premium AI Assistant
                  </span>
                </p>
              </div>
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

        {/* OTHER TOOLS - अभी components नहीं हैं */}
        {!["Home", "AI Chat", "Image AI"].includes(active) && (
          <section className="flex min-h-[70vh] items-center justify-center">
            <div
              className="w-full max-w-2xl rounded-3xl p-10 text-center"
              style={{
                background: "rgba(18,18,25,0.9)",
                border: "1px solid rgba(255,215,0,0.25)",
                boxShadow: "0 0 30px rgba(217,4,41,0.18)"
              }}
            >
              <div className="text-5xl">👑</div>

              <h1 className="mt-5 text-3xl font-bold text-yellow-400">
                {active}
              </h1>

              <p className="mt-4 text-gray-400">
                यह module अभी तैयार किया जा रहा है।
              </p>
            </div>
          </section>
        )}

      </main>
    </div>
  )
}