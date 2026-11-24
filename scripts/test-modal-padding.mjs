import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:3000";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // Desktop Check
  console.log("Testing Desktop Modal at 1440px...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE_URL, { waitUntil: "networkidle0" });

  // Click Hero Ask for a time
  await page.click(".hero-btn-primary");
  await page.waitForSelector("[role='dialog']", { visible: true });
  await new Promise((r) => setTimeout(r, 600));

  const desktopModalInfo = await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    const container = dialog.querySelector(".grid-cols-3");
    const parent = container ? container.parentElement : null;
    const buttons = Array.from(container ? container.querySelectorAll("button") : []);

    const containerStyle = parent ? window.getComputedStyle(parent) : null;

    const btnInfo = buttons.map((b) => {
      const s = window.getComputedStyle(b);
      return {
        text: b.innerText,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight,
        height: s.height,
        borderRadius: s.borderRadius,
      };
    });

    return {
      containerPadding: containerStyle
        ? `${containerStyle.paddingTop} ${containerStyle.paddingRight} ${containerStyle.paddingBottom} ${containerStyle.paddingLeft}`
        : null,
      buttons: btnInfo,
    };
  });

  console.log("Desktop Modal Container Padding:", desktopModalInfo.containerPadding);
  console.log("Desktop Modal Buttons Info:", desktopModalInfo.buttons);

  // Take screenshot of the modal
  const modalEl = await page.$("[role='dialog'] > div:nth-child(2)");
  if (modalEl) {
    await modalEl.screenshot({ path: path.resolve("modal-desktop.png") });
    console.log("Saved modal-desktop.png");
  }

  // Mobile Check
  console.log("\nTesting Mobile Modal at 390px...");
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.reload({ waitUntil: "networkidle0" });

  await page.click(".hero-btn-primary");
  await page.waitForSelector("[role='dialog']", { visible: true });
  await new Promise((r) => setTimeout(r, 600));

  const mobileModalInfo = await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    const container = dialog.querySelector(".grid-cols-3");
    const parent = container ? container.parentElement : null;
    const buttons = Array.from(container ? container.querySelectorAll("button") : []);

    const containerStyle = parent ? window.getComputedStyle(parent) : null;

    const btnInfo = buttons.map((b) => {
      const s = window.getComputedStyle(b);
      return {
        text: b.innerText,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        height: s.height,
      };
    });

    return {
      containerPadding: containerStyle
        ? `${containerStyle.paddingTop} ${containerStyle.paddingRight} ${containerStyle.paddingBottom} ${containerStyle.paddingLeft}`
        : null,
      buttons: btnInfo,
    };
  });

  console.log("Mobile Modal Container Padding:", mobileModalInfo.containerPadding);
  console.log("Mobile Modal Buttons Info:", mobileModalInfo.buttons);

  const mobileModalEl = await page.$("[role='dialog'] > div:nth-child(2)");
  if (mobileModalEl) {
    await mobileModalEl.screenshot({ path: path.resolve("modal-mobile.png") });
    console.log("Saved modal-mobile.png");
  }

  await browser.close();
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
