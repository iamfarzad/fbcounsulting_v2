import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;
const API_TIMEOUT = 15000; // 15 second timeout

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
function formatHistory(history: any[]) {
  if (!history || history.length === 0) return "";
  return "\n" + history.map((msg) => 
    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
  ).join("\n");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY environment variable" },
      { status: 500 }
    );
  }

  if (!API_KEY.match(/^[A-Za-z0-9-_]{20,}$/)) {
    console.error("Invalid API key format - Make sure you're using a valid API key");
    return NextResponse.json(
      { error: "Invalid API key format" },
      { status: 500 }
    );
  }

  // Create abort controller for timeout handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    // Optimize payload by pre-formatting history
    const formattedHistory = formatHistory(body.history);
    
    // Keep the message shorter and more focused
    const prompt = `${SYSTEM_INSTRUCTION}\n\nConversation history:${formattedHistory}\n\nUser's new message: ${body.message}\n\nRespond as Farzad-AI:`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-exp-03-25:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `API call failed with status: ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        console.error("Gemini API Error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          url: response.url
        });
        errorMessage = errorData.error?.message || errorMessage;
      } catch {
        console.error("Raw API Error:", errorText);
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Gemini API Response:", JSON.stringify(data, null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (!text) {
      console.error("Invalid response format:", JSON.stringify(data, null, 2));
      throw new Error('No text generated');
    }

    return NextResponse.json({ message: text, status: 200 });
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    console.error("Error sending message:", error);
    
    // Better error responses
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: "Request timed out", status: 504 },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: "Error processing your request", details: error.message, status: 500 },
      { status: 500 }
    );
  }
}
