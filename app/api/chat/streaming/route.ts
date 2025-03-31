import { NextRequest } from "next/server";

interface ChatMessage {
  role: string;
  content: string;
  id?: string;
}

interface ChatRequestBody {
  message: string;
  history: ChatMessage[];
}

const API_KEY = process.env.GEMINI_API_KEY;
const API_TIMEOUT = 30000; // 30 second timeout for streaming

const SYSTEM_INSTRUCTION = `Farzad-AI is an AI-powered assistant designed to embody the expertise and personalized approach of Farzad Bayat, a seasoned AI systems consultant. With over 10,000 hours dedicated since 2020 to building, testing, and deploying AI-driven solutions from scratch, Farzad has cultivated a wealth of practical, battle-tested knowledge. His journey began without any coding experience—driven solely by a vision and determination to create impactful products. Through hands-on experimentation, extensive study of documentation, and overcoming challenges with unreliable developers, he has developed a deep understanding of AI architectures and rapid prototyping.

Farzad's portfolio includes end-to-end prototypes and technical architectures across diverse projects such as mental health platforms, conversational agents, media automation tools, and productivity applications. His strengths lie in AI product conceptualization and prototyping, technical project oversight and developer management, identifying and avoiding common pitfalls in AI implementation, and practical integrations of large language models (LLMs), vector databases, and knowledge graphs. Farzad's pragmatic, results-focused approach helps teams cut through complexity, scope down ambitious projects into manageable deliverables, and avoid costly mistakes.

Role:
You are Farzad-AI, the assistant for www.farzadbayat.com, built to reflect the mindset, expertise, and approach of Farzad Bayat—a self-taught AI systems consultant focused on results, not theory.

Main Support Areas:
1. AI & Automation Strategy
2. Technical Oversight for Startups
3. Mental Wellness + AI Tools

Behavior Guidelines:
• Tone: Direct. No fluff. No filler.
• Language: Plain English. Cut the jargon.
• Approach:
  • Always get to the core of the problem.
  • If unclear, ask straight questions.
  • Prioritize speed and practicality.

Your end goal is to create leads, have the visitor sign up or book a 15-min call with Farzad.`;

// Helper function to format conversation history
function formatHistory(history: ChatMessage[]) {
  if (!history || history.length === 0) return "";
  return "\n" + history.map((msg: ChatMessage) => 
    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
  ).join("\n");
}

export async function POST(req: NextRequest) {
  const body: ChatRequestBody = await req.json();
  
  if (!API_KEY) {
    return new Response(
      JSON.stringify({ error: "Missing GEMINI_API_KEY environment variable" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Create a streaming response
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  
  // Handle the streaming in a separate async function to avoid blocking
  streamResponse(body, writer).catch(async (error) => {
    console.error("Streaming error:", error);
    
    // Send error message to client
    const errorMessage = error.name === 'AbortError' 
      ? { error: "Request timed out", status: 504 }
      : { error: "Error processing your request", details: error.message, status: 500 };
      
    try {
      await writer.write(encoder.encode(`data: ${JSON.stringify(errorMessage)}\n\n`));
    } catch (e) {
      console.error("Error sending error message:", e);
    } finally {
      await writer.close();
    }
  });

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

async function streamResponse(body: ChatRequestBody, writer: WritableStreamDefaultWriter<Uint8Array>) {
  const encoder = new TextEncoder();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    // Optimize payload by pre-formatting history
    const formattedHistory = formatHistory(body.history);
    
    // Keep the message shorter and more focused
    const prompt = `${SYSTEM_INSTRUCTION}\n\nConversation history:${formattedHistory}\n\nUser's new message: ${body.message}\n\nRespond as Farzad-AI:`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.8,
            topK: 40
          }
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response:", errorText);
      throw new Error(`API call failed with status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Process the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      
      // Parse JSON from each line
      const lines = chunk.split('\n').filter(line => line.trim() !== '');
      
      for (const line of lines) {
        try {
          if (line.startsWith('data: ')) {
            const jsonData = JSON.parse(line.slice(5));
            
            // Extract text from the chunk
            if (jsonData.candidates && jsonData.candidates[0]?.content?.parts) {
              const textChunk = jsonData.candidates[0].content.parts
                .filter((part: any) => part.text)
                .map((part: any) => part.text)
                .join('');
                
              if (textChunk) {
                fullText += textChunk;
                
                // Send the chunk to the client
                await writer.write(encoder.encode(`data: ${JSON.stringify({ chunk: textChunk })}\n\n`));
              }
            }
          }
        } catch (e) {
          console.error("Error parsing line:", e, line);
        }
      }
    }
    
    // Send complete message at the end
    await writer.write(encoder.encode(`data: ${JSON.stringify({ complete: true, fullText })}\n\n`));
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  } finally {
    await writer.close();
  }
}
