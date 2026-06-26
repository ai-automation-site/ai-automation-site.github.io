import { config } from "../config/env.js";

export async function generateContent(website, keyword, affiliateLink) {
  const prompt = `
You are an expert affiliate content writer.

Website: ${website}
Keyword: ${keyword}
Affiliate Link: ${affiliateLink}

Task:
1. Create a high-converting product description
2. Write a short engaging story
3. Make it SEO optimized
4. Keep it persuasive but natural

Return format:
Title:
Description:
Story:
`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await res.json();

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
