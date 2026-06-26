import { chromium } from "playwright";
import { config } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { retry } from "../utils/retry.js";

export async function postOnIndieHackers(content, keyword) {
  return retry(async () => {
    const browser = await chromium.launch({ headless: config.headless });
    const page = await browser.newPage();

    logger.info("Opening Indie Hackers login...");

    await page.goto("https://www.indiehackers.com/sign-in");

    await page.fill('input[type="email"]', config.indieEmail);
    await page.fill('input[type="password"]', config.indiePassword);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(5000);

    logger.info("Navigating to create product...");

    await page.goto("https://www.indiehackers.com/products/new");

    await page.fill('input[name="name"]', keyword);
    await page.fill('textarea[name="tagline"]', content.slice(0, 120));
    await page.fill('textarea[name="description"]', content);

    await page.click('button:has-text("Save")');

    await page.waitForTimeout(5000);

    const liveUrl = page.url();

    await browser.close();

    return liveUrl;
  });
}
