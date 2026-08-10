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

    const newChat = [...chat, { role: "user", content: text }]
    setChat(newChat)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newChat }),
      })
      const data = await res.json()
      setChat([
        ...newChat,
        { role: "assistant", content: data.text || "माफ़ कीजिए, अभी जवाब नहीं मिला।" },
      ])
    } catch {
      setChat([...newChat, { role: "assistant", content: "AI से connection में समस्या आ गई।" }])
    } finally {
      setLoading(false)
    }
  }

  const newChat = () => {
    setChat([{ role: "assistant", content: "🤖 नमस्ते!" }])
  }

  return (
    <div className="h-[calc(100vh-3rem)] flex-col bg-white text-black rounded-2xl border-2 border-black">
      
      {/* Header */}
      <div className="border-b-2 border-black p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">PriyaVRana-AI</h2>
        <button onClick={newChat} className="font-bold hover:underline">
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((m: any, i: number) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-start gap-2 max-w-[80%]">
              {m.role === "assistant" && <span className="text-2xl pt-1">🤖</span>}
              
              <div
                className={`px-4 py-3 rounded-2xl whitespace-pre-wrap text-lg ${
                  m.role === "user"
                    ? "bg-gray-200 text-black rounded-br-md" // Right bubble
                    : "bg-white text-black rounded-bl-md" // Left bubble
                }`}
              >
                {m.content}
              </div>

              {m.role === "user" && <span className="text-2xl pt-1">👤</span>}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <span className="text-2xl pt-1">🤖</span>
              <div className="px-4 py-3 rounded-2xl bg-white text-gray-500">
                PriyaVRana-AI सोच रहा है...
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Plus menu */}
      {showPlus && (
        <div className="border-t-2 border-black p-3 flex gap-2 bg-gray-50">
          <button className="px-3 py-2 rounded-xl hover:bg-black/10 flex items-center">
            <Paperclip size={18} />
            <span className="ml-2">File</span>
          </button>
          <button onClick={() => setShowPlus(false)} className="ml-auto p-2">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="border-t-2 border-black p-3 flex items-center gap-2 bg-gray-50">
        <button onClick={() => setShowPlus(!showPlus)} className="p-3 rounded-xl hover:bg-black/10">
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
          placeholder="PriyaVRana-AI से पूछें..."
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-lg px-2"
        />

        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="p-3 rounded-xl bg-black text-white disabled:opacity-40"
        >
          <Send size={22} />
        </button>
      </div>
    </div>
  )
}