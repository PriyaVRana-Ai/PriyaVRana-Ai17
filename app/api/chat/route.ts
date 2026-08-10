export async function POST(req: Request) {
  try {
    const { message, messages } = await req.json();

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return Response.json(
        { error: "GROQ_API_KEY nahi mili. .env.local check karo." },
        { status: 500 }
      );
    }

    const chatMessages = Array.isArray(messages)
      ? messages
          .filter(
            (m: any) =>
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .map((m: any) => ({
            role: m.role,
            content: m.content,
          }))
      : [];

    if (chatMessages.length === 0 && message) {
      chatMessages.push({
        role: "user",
        content: message,
      });
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
          messages: [
            {
              role: "system",
              content:
                "You are PriyaVRana-AI, a helpful and friendly AI assistant. Reply in Hindi or Hinglish according to the user's language. Give clear and useful answers.",
            },
            ...chatMessages,
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Groq error:", data);

      return Response.json(
        {
          error:
            data?.error?.message ||
            "Groq se response lene mein problem hui.",
        },
        { status: 500 }
      );
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Mujhe abhi jawab nahi mila.";

    return Response.json({
      reply,
    });
  } catch (error) {
    console.error("Chat error:", error);

    return Response.json(
      {
        error: "AI Chat mein temporary problem aa gayi.",
      },
      { status: 500 }
    );
  }
}