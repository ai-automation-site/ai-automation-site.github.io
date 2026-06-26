import dotenv from "dotenv";
dotenv.config();

export const config = {
  sheetId: process.env.GOOGLE_SHEET_ID,
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),

  geminiKey: process.env.GEMINI_API_KEY,

  indieEmail: process.env.INDIE_EMAIL,
  indiePassword: process.env.INDIE_PASSWORD,

  headless: process.env.HEADLESS === "true"
};
