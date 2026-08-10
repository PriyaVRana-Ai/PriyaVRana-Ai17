if (!text && !preview) return;
if (loading) return;

const userMsg: Message = {
  role: "user",
  content: text,
  image: preview,
};

const newChat = [...chat, userMsg];

setChat(newChat);
setMsg("");
setPreview(null);
setLoading(true);

try {
  const lowerText = text.toLowerCase();

  const wantsImage =
    lowerText.includes("create image") ||
    lowerText.includes("generate image") ||
    lowerText.includes("image banao") ||
    lowerText.includes("photo banao") ||
    lowerText.includes("picture banao");

  const response = await fetch(
    wantsImage ? "/api/generate-image" : "/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
        prompt: text,
        messages: newChat,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error || "Server se response nahi mila."
    );
  }

  setChat((current) => [
    ...current,
    {
      role: "assistant",
      content:
        data.reply ||
        (data.image
          ? "✨ Image ready hai!"
          : "Sorry, mujhe response nahi mila."),
      image: data.image || null,
    },
  ]);
} catch (error) {
  console.error(error);

  setChat((current) => [
    ...current,
    {
      role: "assistant",
      content:
        error instanceof Error
          ? `Error: ${error.message}`
          : "Sorry bhai, abhi response nahi aa raha.",
    },
  ]);
} finally {
  setLoading(false);
}if (!file) return;

if (!file.type.startsWith("image/")) {
  return;
}

setPreview(URL.createObjectURL(file));  {chat.length === 0 && (
    <div className="p-4">
      <h1 className="mb-2 text-2xl font-bold">
        👑 PriyaVRana-AI
      </h1>

      <p className="mb-4 text-xl font-semibold">
        Where should we start?
      </p>

      <div className="grid grid-cols-2 gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.text}
            type="button"
            onClick={() => setMsg(suggestion.text)}
            className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-left transition hover:bg-white/20"
          >
            <span className="text-xl">
              {suggestion.icon}
            </span>

            <span className="text-sm">
              {suggestion.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  )}

  <div className="flex-1 space-y-3 overflow-y-auto p-4">

    {chat.map((message, index) => (
      <div
        key={index}
        className={`flex ${
          message.role === "user"
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div
          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
            message.role === "user"
              ? "bg-[#D90429] text-white"
              : "bg-white/10 text-gray-200"
          }`}
        >
          {message.image && (
            <img
              src={message.image}
              alt="AI generated"
              className="mb-2 max-h-80 w-full rounded-xl object-contain"
            />
          )}

          {message.content && (
            <p className="whitespace-pre-wrap">
              {message.content}
            </p>
          )}
        </div>
      </div>
    ))}

    {loading && (
      <div className="text-sm text-gray-400">
        PriyaVRana-AI typing...
      </div>
    )}
  </div>

  <div className="border-t border-white/10 bg-black/60 p-3 backdrop-blur-xl">

    {preview && (
      <div className="relative mb-2 inline-block">
        <img
          src={preview}
          alt="Selected"
          className="h-16 w-16 rounded-xl object-cover"
        />

        <button
          type="button"
          onClick={() => setPreview(null)}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs"
        >
          ×
        </button>
      </div>
    )}

    <div className="flex items-center gap-2">

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="rounded-full p-3 text-xl transition hover:bg-white/10"
      >
        +
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      <input
        value={msg}
        onChange={(event) => setMsg(event.target.value)}
        placeholder="Ask PriyaVRana AI"
        disabled={loading}
        className="flex-1 rounded-full bg-white/10 px-4 py-3 outline-none placeholder:text-gray-400 disabled:opacity-50"
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey
          ) {
            event.preventDefault();
            send();
          }
        }}
      />

      <button
        type="button"
        onClick={send}
        disabled={
          loading ||
          (!msg.trim() && !preview)
        }
        className="rounded-full bg-white p-3 text-black transition hover:bg-gray-200 disabled:opacity-50"
      >
        ➤
      </button>

    </div>
  </div>
</div>