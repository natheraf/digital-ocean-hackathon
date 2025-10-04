const prompts = {
  // Summarize
  summarizeShort: (text) =>
    `Summarize the following text in a few sentences:\n${text}`,
  summarizeDetailed: (text) =>
    `Summarize the following text in a few sentences:\n${text}`,
  summarizeForKids: (text) =>
    `Explain the following text as if to a 10 year old, using simple language:\n${text}`,
  summarizeSections: (text) =>
    `Break this text into chapters or sections and give a short summary of each one:\n${text}`,

  // Context
  explainTerm: (text) => `Explain this term:\n${text}`,
  explainContext: (text) => `What does this text mean in context?:\n${text}`,
  explainMainIdeas: (text) =>
    `What are the main ideas or arguments in the following text:\n${text}`,
  explainWithExamples: (text) =>
    `Explain this text using real-world examples and analogies:\n${text}`,

  // Fallbacks
  minimalContext: (text) =>
    `The user highlighted this text:\n${text}\nProvide a general explanation and mention possible interpretations.`,
};

export default prompts;
