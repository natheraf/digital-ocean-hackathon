// Get finalPrompt by calling a function from prompts.js
export const runAI = async (finalPrompt) => {
  const url = "https://inference.do-ai.run/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_DO_AI_KEY}`,
  };
  const data = {
    model: "openai-gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: finalPrompt,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const json = await response.json();
    const result = json.choices?.[0]?.message?.content ?? "No response";
    console.log(result);

    return result; // ✅ returns to caller
  } catch (error) {
    console.error("Error running AI:", error);
    throw error; // so the caller can handle it
  }
};
