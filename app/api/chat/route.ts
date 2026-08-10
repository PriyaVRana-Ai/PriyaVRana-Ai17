export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const GROQ_API_KEY = process.env.GROQ_API_KEY

    if (!GROQ_API_KEY) {
      return Response.json(
        { text: "PriyaVRana-AI: GROQ_API_KEY nahi mili." },
        { status: 500 }
      )
    }

    const lastMsg = messages[messages.length - 1]?.content || ""

    const abuse = ["gaali", "abuse"]

    if (
      abuse.some((word) =>
        lastMsg.toLowerCase().includes(word)
      )
    ) {
      return Response.json({
        text: "Rude baat mat karo 🙏 PriyaVRana-AI aapki madad ke liye hai."
      })
    }

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.7,
        }),
      }
    )

    const data = await res.json()

    if (!res.ok) {
      console.error("Groq error:", data)

      return Response.json(
        { text: "PriyaVRana-AI ko AI response lene mein problem hui." },
        { status: 500 }
      )
    }

    return Response.json({
      text:
        data.choices?.[0]?.message?.content ||
        "Mujhe abhi jawab nahi mila.",
    })
  } catch (error) {
    console.error("Chat error:", error)

    return Response.json(
      { text: "AI Chat mein temporary problem aa gayi." },
      { status: 500 }
    )
  }
}