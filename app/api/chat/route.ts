import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;

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

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY environment variable" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ 
                text: SYSTEM_INSTRUCTION + "\n\nConversation history:" + 
                  (body.history ? "\n" + body.history.map((msg: any) => 
                    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
                  ).join("\n") : "") +
                  "\n\nUser's new message: " + body.message +
                  "\n\nRespond as Farzad-AI:"
              }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 0.8,
            topK: 40
          }
        })
      }
    );

    if (!response.ok) {
      console.error("API Response:", await response.text());
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0]?.content?.parts[0]?.text;

    if (!text) {
      throw new Error('No text generated');
    }

    return NextResponse.json({ message: text, status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Error sending message", status: 500 }
    );
  }
}
