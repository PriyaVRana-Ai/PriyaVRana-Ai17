export async function POST(req: Request) {
  try {
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

    if (!STABILITY_API_KEY) {
      return Response.json(
        { error: "STABILITY_API_KEY nahi mili. .env.local check karo." },
        { status: 500 }
      );
    }

    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return Response.json(
        { error: "Image prompt chahiye." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          Accept: "image/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          output_format: "png",
          aspect_ratio: "1:1",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Stability API Error:", errorText);

      return Response.json(
        {
          error: "Image generate nahi ho paayi. Stability API check karo.",
        },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();

    const base64Image = Buffer.from(imageBuffer).toString("base64");

    return Response.json({
      image: `data:image/png;base64,${base64Image}`,
      reply: "✨ Image ready hai!",
    });
  } catch (error) {
    console.error("IMAGE API ERROR:", error);

    return Response.json(
      {
        error: "Image generate karte waqt error aa gaya.",
      },
      { status: 500 }
    );
  }
}