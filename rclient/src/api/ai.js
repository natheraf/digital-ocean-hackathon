// Get finalPrompt by calling a function from prompts.js
export const runAI = (finalPrompt) => {
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

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.choices[0].message)
    });
};