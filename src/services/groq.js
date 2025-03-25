export const getAIResponse = async (messages) => {
  // Validate input
  if (!messages?.length) {
    console.error("Empty messages array");
    return "Please provide a valid conversation history.";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Most capable free model
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      }),
      timeout: 10000 // 10s timeout
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API Error:", {
        status: response.status,
        error: errorData
      });
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();

  } catch (error) {
    console.error("Groq Request Failed:", error);
    return "Sorry, I couldn't process your request. Please try again later.";
  }
};