"use client"
import { useState, useRef, useEffect } from "react"
import { Send, Plus, Mic } from "lucide-react"

export default function Chat({ chat, setChat }: any) {
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  const sendMessage = () => {
    if (!input.trim()) return
    setChat([...chat, { role: "user", content: input }])
    setInput("")
    // Yaha AI ka reply aayega
    setTimeout(() => {
      setChat((prev:any) => [...prev, { role: "assistant", content: "Ye demo reply hai 👑" }])
    }, 500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]">
      
      {/* Chat Messages - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-2 md:px-6 pb-24">
        {chat.map((msg:any, i:number) => (
          <div key={i} className={`flex gap-3 my-4 ${msg.role === "user"? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && <div className="text-2xl">🤖</div>}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user"? "bg-[#D90429] text-white" : "bg-white/10 text-gray-200"}`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === "user" && <div className="text-2xl">👤</div>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bottom Input Bar - ChatGPT jaisa FIXED */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#0a0a0f]/90 backdrop-blur-md border-t border-white/10 p-3">
        <div className="mx-auto max-w-3xl flex items-center gap-2">
          
          {/* + Button */}
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
            <Plus size={20} />
          </button>

          {/* Input Box */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="PriyaVRana-AI se pucho..."
            className="flex-1 bg-[#1a1a24] rounded-full px-4 py-3 text-white outline-none border-white/10"
          />

          {/* Mic or Send Button */}
          <button 
            onClick={sendMessage}
            className="p-2 rounded-full bg-[#D90429] hover:opacity-90">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}