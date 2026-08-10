export async function POST(req: Request) {
  try {
    // 1. Key check sabse pehle
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    if (!STABILITY_API_KEY) {
      return Response.json({ error: "Error: STABILITY_API_KEY nahi mili Vercel me" }, { status: 500 });
    }

    const formData = await req.formData();
    const image = formData.get("image") as File;
    const prompt = formData.get("prompt") as string;

    if(!image || !prompt) {
      return Response.json({ error: "Image aur Prompt dono chahiye" }, { status: 400 });
    }

    const stabilityForm = new FormData();
    stabilityForm.append("image", image);
    stabilityForm.append("prompt", prompt);
    stabilityForm.append("output_format", "png"); // ya "jpeg"

    const res = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${STABILITY_API_KEY}`,
        // Content-Type mat daalna, FormData khud laga dega
      },
      body: stabilityForm
    });

    if(!res.ok) {
      const err = await res.text();
      return Response.json({ error: `Stability Error: ${err}` }, { status: res.status });
    }

    const blob = await res.blob();
    return new Response(blob, { 
      headers: { "Content-Type": "image/png" } 
    });

  } catch (error: any) {
    console.error("IMAGE API ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}