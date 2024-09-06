// app/api/chat/route.ts

import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    // const { messages } = await req.json();
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Get a language model
    const model = google("models/gemini-1.5-flash-latest");

    // Call the language model with the prompt
    const result = await streamText({
      model,
      prompt,
      // messages,
      maxTokens: 400,
      // temperature: 0.7,
      // topP: 0.4,
    });

    // Respond with a streaming response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("An Unexpected Error Occoured", error);
    throw error;
  }
}
