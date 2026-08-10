"use client"
import { useState, useRef, useEffect } from "react"

export default function Chat({ chat, setChat }: any) {
  const [input, setInput] = useState("")
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  const handleFile = (e: any) => {
    const file = e.target.files[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const sendMessage = () => {
    if (!input.trim() &&!preview) return

    let newMsg:any = { role: "user", content: input }
    if (preview) newMsg.image = preview

    setChat([...chat, newMsg])
    setInput("")
    setPreview(null)

    // Demo AI Reply
    setTimeout(() => {
      setChat((prev:any) => [...prev, { role: "assistant", content: "Samajh gaya bhai 👑 Ab ispe kya karu?" }])
    }, 800)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)]">
      <div className="flex-1 overflow-y-auto px-2 md:px-6 pb-24">
        {chat.map((msg:any, i:number) => (
          <div key={i} className={`flex gap-3 my-4 ${msg.role === "user"? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && <div className="text-2xl">🤖</div>}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user"? "bg-[#D90429] text-white" : "bg-white/10 text-gray-200"}`}>
              {msg.image && <img src={msg.image} className="rounded-xl mb-2 max-w-xs"/>}
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === "user" && <div className="text-2xl">👤</div>}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {preview && (
        <div className="fixed bottom-20 md:bottom-20 left-1/2 -translate-x-1/2 bg-black/80 p-2 rounded-xl">
          <img src={preview} className="h-20 rounded-lg"/>
          <button onClick={() => setPreview(null)} className="text-xs text-red-400 block mx-auto">Remove</button>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#0a0a0f]/90 backdrop-blur-md border-t border-white/10 p-3">
        <div className="mx-auto max-w-3xl flex items-center gap-2">
          <button onClick={() => fileRef.current?.click()} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-xl">+</button>
          <input type="file" ref={fileRef} onChange={handleFile} accept="image/*" className="hidden"/>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="PriyaVRana-AI se pucho..." className="flex-1 bg-[#1a1a24] rounded-full px-4 py-3 text-white outline-none"/>
          <button onClick={sendMessage} className="px-5 py-3 rounded-full bg-[#D90429] font-bold hover:opacity-90">Send</button>
        </div>
      </div>
    </div>
  )
}