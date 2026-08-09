export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMsg = messages[messages.length-1]?.content || ""

  // Hate/Abuse check
  const abuse = ["gaali", "abuse", "hate"]
  if(abuse.some(w => lastMsg.toLowerCase().includes(w))) {
    return Response.json({ text: "Radhe Radhe 🙏\nPriyaVRana-AI में आपका स्वागत है।\nकृपया सम्मानजनक भाषा का उपयोग करें। मैं आपकी मदद करने के लिए यहाँ हूँ।" })
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-70b-versatile",
      messages,
      temperature: 0.7
    })
  })
  const data = await res.json()
  return Response.json({ text: data.choices[0].message.content })
}