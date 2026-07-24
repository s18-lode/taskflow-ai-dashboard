import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: NextRequest) {
    try {
        const { task } = await request.json();

        if (!task) {
            return NextResponse.json(
                { error: "Task is required." },
                { status: 400 }
            );
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
      You are an AI project planner.
      
      Break the following project into exactly 6 short actionable subtasks.
      
      Project:
      ${task}
      
      Rules:
      - Return only valid JSON.
      - Do not use markdown.
      - Do not explain anything.
      - Each task should be under 8 words.
      
      Return this exact format:
      
      {
        "subtasks": [
          "Setup project",
          "Create Design System",
          "Create UI",
          "Connect API",
          "Testing",
          "Deployment"
        ]
      }
      `,
        });

        const aiResponse = JSON.parse(response.text || "{}");

        return NextResponse.json(aiResponse);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}