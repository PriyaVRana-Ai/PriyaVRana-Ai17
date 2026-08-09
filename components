"use client"
import { useState, useRef } from "react"
import { Plus, Send, Mic, Image as Img } from "lucide-react"

export default function Chat({chat, setChat}:any) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPlus, setShowPlus] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const send = async () => {
    setLoading(true)
    const newChat = [...chat, {role:"user", content:input}]
    setChat(newChat)
    const res = await fetch("/api/chat", {method:"POST", body:JSON.stringify({messages:newChat})})
    const data = await res.json()
    setChat([...newChat, {role:"assistant", content:data.text}])
    setInput(""); setLoading(false)
  }

  return (
    <div>
      {chat.map((m:any,i:number)=><div key={i} className="glass p-3 rounded-xl mb-2">{m.content}</div>)}
      <div className="fixed bottom-4 w-[calc(100%-18rem)] glass p-3 rounded-2xl flex gap-2">
        <button onClick={()=>setShowPlus(!showPlus)}><Plus/></button>
        {showPlus && <div className="absolute bottom-12 glass p-2 rounded-lg">
          <button onClick={()=>fileRef.current?.click()}>Upload Photo</button>
          <button>Camera</button>
        </div>}
        <input ref={fileRef} type="file" className="hidden"/>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="आप क्या पूछना चाहते हैं..." className="flex-1 bg-transparent"/>
        <button onClick={send}><Send/></button>
      </div>
    </div>
  )
}