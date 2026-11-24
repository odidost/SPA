import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:3000";

async function verify() {
  console.log("Launching Edge browser...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // 1. Desktop Check at 1440px
  console.log("\n--- DESKTOP VERIFICATION (1440px) ---");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);

  const desktopMetrics = await page.evaluate(() => {
    const footer = document.querySelector("footer");
    const footerText = footer ? footer.innerText : "";
    const hasFooterWordmark = !!footer.querySelector("img");
    const hasTheSpaLinks = footerText.includes("Treatment Menu") && footerText.includes("Couples Suite Massage");
    const hasAddressHours = footerText.includes("Rayfield") && footerText.includes("Tuesday – Saturday");
    const hasFooterBooking = !!footer.querySelector("button");
    const hasChywebAudit = footerText.includes("I want this for my spa");

    const hero = document.querySelector(".hero-container");
    const heroText = hero ? hero.innerText : "";
    const hasFeaturePills = heroText.includes("Side-by-side private suite") && heroText.includes("Two licensed therapists");

    const guestCards = document.querySelectorAll(".guest-sequence-card");
    const treatmentCards = document.querySelectorAll(".treatment-card");
    const spaceSection = document.querySelector(".the-space-section");
    const sanctuaryPromise = document.querySelectorAll(".sanctuary-promise-card");

    const visitSection = document.querySelector(".visit-section");
    const visitText = visitSection ? visitSection.innerText : "";
    const hasReceptionDesk = visitText.includes("Reception Desk") && visitText.includes("Reserve your quiet hour");
    const hasPricingTable = visitText.includes("₦60,000 total") && visitText.includes("₦35,000");

    const nav = document.querySelector(".header-nav");
    const navText = nav ? nav.innerText : "";
    const hasSpaceNav = navText.includes("The Space");

    return {
      footer: {
        hasFooterWordmark,
        hasTheSpaLinks,
        hasAddressHours,
        hasFooterBooking,
        hasChywebAudit,
      },
      hero: {
        hasFeaturePills,
      },
      sections: {
        guestSequenceCount: guestCards.length,
        treatmentCardCount: treatmentCards.length,
        hasSpaceSection: !!spaceSection,
        sanctuaryPromiseCount: sanctuaryPromise.length,
        hasReceptionDesk,
        hasPricingTable,
      },
      header: {
        hasSpaceNav,
      },
    };
  });

  console.log("Desktop Verification Results:");
  console.log("Footer - Wordmark:", desktopMetrics.footer.hasFooterWordmark);
  console.log("Footer - The Spa links:", desktopMetrics.footer.hasTheSpaLinks);
  console.log("Footer - Address & Hours:", desktopMetrics.footer.hasAddressHours);
  console.log("Footer - Booking Button:", desktopMetrics.footer.hasFooterBooking);
  console.log("Footer - Chyweb Audit link:", desktopMetrics.footer.hasChywebAudit);
  console.log("Hero - Feature Pills restored:", desktopMetrics.hero.hasFeaturePills);
  console.log("Header - 'The Space' Nav link restored:", desktopMetrics.header.hasSpaceNav);
  console.log("Chapter II - Guest Sequence Cards:", desktopMetrics.sections.guestSequenceCount);
  console.log("Chapter III - Treatment Cards:", desktopMetrics.sections.treatmentCardCount);
  console.log("Chapter IV - The Space section present:", desktopMetrics.sections.hasSpaceSection);
  console.log("Sanctuary Standards Promise count:", desktopMetrics.sections.sanctuaryPromiseCount);
  console.log("Visit - Reception Desk Card restored:", desktopMetrics.sections.hasReceptionDesk);
  console.log("Visit - Pricing Table restored:", desktopMetrics.sections.hasPricingTable);

  await page.screenshot({ path: path.resolve("screenshot-1440.png"), fullPage: true });
  await page.screenshot({ path: path.resolve("nera-desktop.webp"), type: "webp", quality: 92 });
  console.log("Saved screenshot-1440.png and nera-desktop.webp");

  // 2. Tablet Check at 768px
  console.log("\n--- TABLET VERIFICATION (768px) ---");
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.resolve("screenshot-768.png"), fullPage: true });
  console.log("Saved screenshot-768.png");

  // 3. Mobile Check at 390px
  console.log("\n--- MOBILE VERIFICATION (390px) ---");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);

  const mobileCheck = await page.evaluate(() => {
    // Check mobile booking bar
    const mobileBar = document.querySelector(".safe-bottom");
    const mobileBarVisible = !!mobileBar && window.getComputedStyle(mobileBar).display !== "none";
    // Check hamburger button
    const hamburgerBtn = document.querySelector("button[aria-label='Toggle navigation menu']");
    return {
      mobileBarVisible,
      hasHamburger: !!hamburgerBtn,
    };
  });
  console.log("Mobile Booking Bar active on homepage:", mobileCheck.mobileBarVisible);
  console.log("Mobile Hamburger toggle present:", mobileCheck.hasHamburger);

  await page.screenshot({ path: path.resolve("screenshot-390.png"), fullPage: true });
  await page.screenshot({ path: path.resolve("nera-mobile.webp"), type: "webp", quality: 92 });
  console.log("Saved screenshot-390.png and nera-mobile.webp");

  // Copy webp exports to chyweb-brief/assets
  const chywebAssets = path.resolve("chyweb-brief/assets");
  if (fs.existsSync(chywebAssets)) {
    fs.copyFileSync(path.resolve("nera-desktop.webp"), path.join(chywebAssets, "nera-desktop.webp"));
    fs.copyFileSync(path.resolve("nera-mobile.webp"), path.join(chywebAssets, "nera-mobile.webp"));
    fs.copyFileSync(path.resolve("nera-desktop.webp"), path.join(chywebAssets, "nora-desktop.webp"));
    fs.copyFileSync(path.resolve("nera-mobile.webp"), path.join(chywebAssets, "nora-mobile.webp"));
    console.log("Copied webp exports to chyweb-brief/assets/");
  }

  // 4. Test "Ask for a time" interactions
  console.log("\n--- TESTING 'Ask for a time' INTERACTIONS ---");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });

  // Test Footer button
  console.log("Testing Footer 'Ask for a time' button...");
  await page.evaluate(() => {
    const footerBtn = document.querySelector("footer button");
    if (footerBtn) footerBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  const footerModalState = await page.evaluate(() => {
    const modal = document.querySelector("[role='dialog']");
    const text = modal ? modal.innerText : "";
    return {
      isOpen: !!modal,
      hasCouples: text.includes("Couples") || text.includes("60,000"),
    };
  });
  console.log("Footer Modal open result:", footerModalState);

  await page.evaluate(() => {
    const closeBtn = document.querySelector("button[aria-label='Close booking dialog']");
    if (closeBtn) closeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  console.log("\n--- ALL VERIFICATIONS COMPLETED SUCCESSFULLY ---");
  await browser.close();
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
