"use client"
import { useState } from "react"
import { Upload, Wand2, Download } from "lucide-react"

export default function ImageAI() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("No file chosen")

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    // Yaha /api/generate-image ka call lagega
    setTimeout(() => {
      setImage("https://picsum.photos/600/800") // demo ke liye
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">🎨 Image AI</h1>

      {/* Upload + Prompt Box */}
      <div
        className="rounded-2xl p-5 mb-6"
        style={{ background: "rgba(15,15,22,0.88)", border: "1px solid rgba(255,215,0,0.25)" }}
      >
        {/* File Upload */}
        <div className="flex items-center gap-3 mb-4">
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm cursor-pointer">
            <Upload size={16} /> Choose File
            <input type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "No file")} />
          </label>
          <span className="text-sm text-gray-400">{fileName}</span>
        </div>

        {/* Prompt Input */}
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Image ko describe karo... jaise: 'make this statue golden'"
          className="w-full bg-[#1a1a24] rounded-xl px-4 py-3 text-white outline-none border-white/10"
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 flex items-center gap-2 bg-[#D90429] px-6 py-2 rounded-xl font-semibold disabled:opacity-50 hover:opacity-90"
        >
          <Wand2 size={18} /> {loading? "Generating..." : "Generate/Edit"}
        </button>
      </div>

      {/* Image Preview - Yahi choti hogi */}
      {image && (
        <div
          className="rounded-2xl p-4"
          style={{ background: "rgba(15,15,22,0.88)", border: "1px solid rgba(255,215,0,0.25)" }}
        >
          <div className="flex justify-center">
            <img
              src={image}
              alt="result"
              className="rounded-xl w-full max-w-md max-h-[60vh] object-contain"
            />
          </div>
          <button className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm">
            <Download size={16} /> Download
          </button>
        </div>
      )}
    </div>
  )
}