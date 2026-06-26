import { google } from "googleapis";
import { config } from "../config/env.js";

const auth = new google.auth.JWT(
  config.clientEmail,
  null,
  config.privateKey,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth });

export async function getRows(range = "Sheet1!A:C") {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: config.sheetId,
    range
  });

  return res.data.values || [];
}

export async function updateLiveLink(rowIndex, link) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: config.sheetId,
    range: `Sheet1!D${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[link]]
    }
  });
}
