import { getRows, updateLiveLink } from "./services/googleSheets.js";
import { generateContent } from "./services/gemini.js";
import { postOnIndieHackers } from "./services/indieHackersBot.js";
import { logger } from "./utils/logger.js";

async function run() {
  try {
    logger.info("Fetching rows from Google Sheets...");

    const rows = await getRows();

    for (let i = 1; i < rows.length; i++) {
      const [website, keyword, affiliateLink, liveLink] = rows[i];

      if (liveLink) continue;

      logger.info(`Processing: ${keyword}`);

      const content = await generateContent(
        website,
        keyword,
        affiliateLink
      );

      const url = await postOnIndieHackers(content, keyword);

      await updateLiveLink(i + 1, url);

      logger.info(`Saved live link: ${url}`);
    }

    logger.info("All rows processed.");
  } catch (err) {
    logger.error("Fatal error in pipeline", err);
  }
}

run();
