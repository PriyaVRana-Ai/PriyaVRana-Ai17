"use client"

import { useEffect, useRef, useState } from "react"
import { Plus, Send, Paperclip, X } from "lucide-react"

export default function Chat({ chat, setChat }: any) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPlus, setShowPlus] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat, loading])

  const send = async () => {
    const text = input.trim()

    if (!text || loading) return

    const newChat = [
      ...chat,
      {
        role: "user",
        content: text,
      },
    ]

    setChat(newChat)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newChat,
        }),
      })

      const data = await res.json()

      setChat([
        ...newChat,
        {
          role: "assistant",
          content:
            data.text || "माफ़ कीजिए, अभी जवाब नहीं मिला।",
        },
      ])
    } catch {
      setChat([
        ...newChat,
        {
          role: "assistant",
          content: "AI से connection में समस्या आ गई।",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const newChat = () => {
    setChat([
      {
        role: "assistant",
        content:
          "🙏 Radhe Radhe!\nPriyaVRana-AI में आपका हार्दिक स्वागत है।",
      },
    ])
  }

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">

      {/* Header */}
      <div className="glass rounded-2xl p-4 mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-royalgold">
            PriyaVRana-AI
          </h2>
          <p className="text-xs text-gray-400">
            Premium AI Assistant
          </p>
        </div>

        <button
          onClick={newChat}
          className="px-3 py-2 rounded-xl glass hover:bg-white/10"
        >
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-4">

        {chat.map((m: any, i: number) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-royalred text-white rounded-br-md"
                  : "glass text-white rounded-bl-md"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="glass px-4 py-3 rounded-2xl text-gray-300">
              PriyaVRana-AI सोच रहा है...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Plus menu */}
      {showPlus && (
        <div className="glass rounded-2xl p-3 mb-2 flex gap-2">
          <button className="px-3 py-2 rounded-xl hover:bg-white/10">
            <Paperclip size={18} />
            <span className="ml-2">File</span>
          </button>

          <button
            onClick={() => setShowPlus(false)}
            className="ml-auto p-2"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="glass rounded-2xl p-2 flex items-center gap-2">

        <button
          onClick={() => setShowPlus(!showPlus)}
          className="p-3 rounded-xl hover:bg-white/10"
        >
          <Plus size={22} />
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          placeholder="PriyaVRana-AI से कुछ पूछें..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
        />

        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="p-3 rounded-xl bg-royalred disabled:opacity-40"
        >
          <Send size={22} />
        </button>

      </div>
    </div>
  )
}