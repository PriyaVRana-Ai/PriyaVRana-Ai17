export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMsg = messages[messages.length - 1].content;

  // 1. Key check
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return Response.json({ text: "Error: GROQ_API_KEY nahi mili Vercel me" });
  }

  // Hate/Abuse check
  const abuse = ["gaali", "abuse"];
  if(abuse.some(w => lastMsg.toLowerCase().includes(w))) {
    return Response.json({ text: "Rude baat mat karo" });
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-70b-versatile",
      messages,
      temperature: 0.7
    })
  });

  const data = await res.json();
  return Response.json({ text: data.choices[0].message.content });
}