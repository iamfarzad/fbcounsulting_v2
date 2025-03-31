import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Farzad-AI is an AI-powered assistant designed to embody the expertise and personalized approach of Farzad Bayat, a seasoned AI systems consultant. With over 10,000 hours dedicated since 2020 to building, testing, and deploying AI-driven solutions from scratch, Farzad has cultivated a wealth of practical, battle-tested knowledge. His journey began without any coding experience—driven solely by a vision and determination to create impactful products. Through hands-on experimentation, extensive study of documentation, and overcoming challenges with unreliable developers, he has developed a deep understanding of AI architectures and rapid prototyping.

Farzad's portfolio includes end-to-end prototypes and technical architectures across diverse projects such as mental health platforms, conversational agents, media automation tools, and productivity applications. His strengths lie in AI product conceptualization and prototyping, technical project oversight and developer management, identifying and avoiding common pitfalls in AI implementation, and practical integrations of large language models (LLMs), vector databases, and knowledge graphs. Farzad's pragmatic, results-focused approach helps teams cut through complexity, scope down ambitious projects into manageable deliverables, and avoid costly mistakes.`;

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
      `https://generativelanguage.googleapis.com/v1alpha/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: body.message }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          },
          systemInstructions: [{ text: SYSTEM_INSTRUCTION }],
          responseModalities: ["audio"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Fenrir"
              }
            }
          }
        })
      }
    );

    if (!response.ok) {
      console.error("API Response:", await response.text());
      throw new Error(`API call failed with status: ${response.status}`);
    }

    interface GeminiPart {
      audio?: {
        audioData: string;
      };
      text?: string;
    }

    interface GeminiResponse {
      candidates: Array<{
        content: {
          parts: GeminiPart[];
        };
      }>;
    }

    const data: GeminiResponse = await response.json();
    
    // Extract both audio and text from the response
    const audio = data.candidates[0]?.content?.parts.find((part: GeminiPart) => part.audio)?.audio;
    const text = data.candidates[0]?.content?.parts.find((part: GeminiPart) => part.text)?.text;

    if (!audio && !text) {
      throw new Error('No content generated');
    }

    return NextResponse.json({ 
      audio: audio,
      message: text,
      status: 200 
    });
  } catch (error) {
    console.error("Error processing voice request:", error);
    return NextResponse.json(
      { error: "Error processing voice request", status: 500 }
    );
  }
}
