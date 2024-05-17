import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

function getSequenceValue(n: number): number {
  if (n <= 6) {
      return Math.pow(2, n);
  } else {
      return Math.pow(2, 6) + (n - 6) * 100;
  }
}

async function getGroqChatCompletion(length: number) {
  const length1 = getSequenceValue(length);
  return groq.chat.completions.create({
      messages: [
          {
              role: "user",
              content: "Only output the explanation. Explain Introduction to Dinosaurs in " + length1 + "words please. Only output the explanation."
          }
      ],
      model: "llama3-8b-8192"
  });
}

export async function GET(request: Request) {
  const lengthHeader = request.headers.get('number');
  const length = lengthHeader ? parseInt(lengthHeader, 10) : 1; // Default to 1 if header is not present or invalid
  const chatCompletion = await getGroqChatCompletion(length);
 
  return new Response(JSON.stringify({ chatCompletion }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}