import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;
console.log(API_KEY);
console.log(API_KEY?.length);

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("body:", body);

  if (!API_KEY) {    return NextResponse.json({ error: "Missing GEMINI_API_KEY environment variable" }, { status: 500 });  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const prompt = body.message;
    const result = await model.generateContent({      contents: [{        parts: [{ text: prompt }],      }],      generationConfig: {        maxOutputTokens: 1000,      },    });
    const text = result.response.text();    

    return NextResponse.json({ message: text, status: 200 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Error sending message", status: 500 });  
  }
}

