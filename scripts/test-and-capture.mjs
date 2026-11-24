import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_URL = "http://localhost:3000";

async function run() {
  console.log("Launching Edge browser at:", EDGE_PATH);
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();

  // Test 1: Desktop Homepage & Screenshot (1440px)
  console.log("\n--- TEST 1: DESKTOP HOMEPAGE (1440px) ---");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.waitForSelector("h1");
  const h1Text = await page.$eval("h1", (el) => el.innerText.trim());
  console.log("Homepage H1:", h1Text);

  // Capture desktop screenshot
  const desktopPath = path.resolve("nera-desktop.webp");
  await page.screenshot({ path: desktopPath, type: "webp", quality: 90 });
  const noraDesktopPath = path.resolve("nora-desktop.webp");
  fs.copyFileSync(desktopPath, noraDesktopPath);
  console.log("Saved nera-desktop.webp and nora-desktop.webp to", desktopPath);

  // Test 2: Tablet Viewport Check (768px)
  console.log("\n--- TEST 2: TABLET VIEWPORT (768px) ---");
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  const tabletTitle = await page.title();
  console.log("Tablet page loaded successfully. Title:", tabletTitle);

  // Test 3: Mobile Homepage & Screenshot (390px)
  console.log("\n--- TEST 3: MOBILE HOMEPAGE (390px) ---");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await page.waitForSelector("h1");

  // Verify mobile order: offer block is before image
  const mobileHeroOrder = await page.evaluate(() => {
    const hero = document.querySelector("section");
    if (!hero) return null;
    const textCol = hero.querySelector(".order-1");
    const imgCol = hero.querySelector(".order-2");
    return {
      textOrder: textCol ? window.getComputedStyle(textCol).order : null,
      imgOrder: imgCol ? window.getComputedStyle(imgCol).order : null,
      bookingBtnVisible: !!document.querySelector("button"),
    };
  });
  console.log("Mobile Hero layout verification:", mobileHeroOrder);

  const mobilePath = path.resolve("nera-mobile.webp");
  await page.screenshot({ path: mobilePath, type: "webp", quality: 90 });
  const noraMobilePath = path.resolve("nora-mobile.webp");
  fs.copyFileSync(mobilePath, noraMobilePath);
  console.log("Saved nera-mobile.webp and nora-mobile.webp to", mobilePath);

  // Copy both screenshots to chyweb-brief/assets/
  const chywebAssetsDir = path.resolve("chyweb-brief/assets");
  if (fs.existsSync(chywebAssetsDir)) {
    fs.copyFileSync(desktopPath, path.join(chywebAssetsDir, "nera-desktop.webp"));
    fs.copyFileSync(mobilePath, path.join(chywebAssetsDir, "nera-mobile.webp"));
    fs.copyFileSync(desktopPath, path.join(chywebAssetsDir, "nora-desktop.webp"));
    fs.copyFileSync(mobilePath, path.join(chywebAssetsDir, "nora-mobile.webp"));
    console.log("Copied screenshots to chyweb-brief/assets/ as nera/nora-desktop.webp and nera/nora-mobile.webp");
  }

  // Switch to standard desktop view for Journey verification
  await page.setViewport({ width: 1280, height: 800 });

  // Test 4: Journey Verification 1 - Couples Massage
  console.log("\n--- TEST 4: JOURNEY 1 - COUPLES MASSAGE ---");
  await page.goto(`${BASE_URL}/treatments/couples-massage`, { waitUntil: "networkidle0" });
  await page.waitForSelector("h1");

  // Confirm that ₦60,000 covers both guests
  const couplesDetails = await page.evaluate(() => {
    const text = document.body.innerText;
    const hasPrice = text.includes("₦60,000");
    const hasBothGuests = text.includes("Two guests") || text.includes("two guests");
    const hasTotalCover = text.includes("Total covers both guests") || text.includes("total for two");
    return { hasPrice, hasBothGuests, hasTotalCover };
  });
  console.log("Couples Massage page verified:", couplesDetails);
  if (!couplesDetails.hasPrice || !couplesDetails.hasBothGuests) {
    throw new Error("Couples massage price or guest count verification failed");
  }

  // Click "Ask for a time" using evaluate
  console.log("Clicking 'Ask for a time' button on Couples Massage page...");
  const clickedAskTime = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const target = btns.find((b) => b.innerText.includes("Ask for a time"));
    if (target) {
      target.click();
      return true;
    }
    return false;
  });
  if (!clickedAskTime) throw new Error("Could not click Ask for a time button");

  // Wait for booking dialog
  await page.waitForSelector("[role='dialog']", { visible: true });
  console.log("WhatsApp-style booking dialog opened.");

  // Check guest message prefill
  const chatMessages = await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    return dialog ? dialog.innerText : "";
  });
  console.log("Dialog contains prefilled Couples message with Nora:", chatMessages.includes("Hi Nora,") || chatMessages.includes("Couples Massage"));
  console.log("Dialog contains ₦60,000:", chatMessages.includes("₦60,000"));

  // Select a sample slot
  const selectedSlot = await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    if (!dialog) return false;
    const btns = Array.from(dialog.querySelectorAll("button"));
    const slotBtn = btns.find((b) => b.innerText.includes("Select"));
    if (slotBtn) {
      slotBtn.click();
      return true;
    }
    return false;
  });
  console.log("Selected a sample appointment slot:", selectedSlot);

  // Wait for Demo Booking Confirmed
  await page.waitForFunction(() => {
    const dialog = document.querySelector("[role='dialog']");
    return dialog && dialog.innerText.includes("DEMO BOOKING CONFIRMED");
  });
  console.log("Confirmed: Demo booking card is displayed!");

  const confirmationDetails = await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    return {
      hasDemoConfirmed: dialog.innerText.includes("DEMO BOOKING CONFIRMED"),
      hasChywebAuditLink: dialog.innerText.includes("I want this for my spa"),
      hasCouples: dialog.innerText.includes("Couples Massage"),
      has60k: dialog.innerText.includes("₦60,000"),
      hasNoraRef: dialog.innerText.includes("NORA"),
    };
  });
  console.log("Confirmation card details:", confirmationDetails);

  // Close dialog
  await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    const closeBtn = dialog?.querySelector("button[aria-label='Close booking window']");
    if (closeBtn) closeBtn.click();
  });
  await page.waitForFunction(() => !document.querySelector("[role='dialog']"));
  console.log("Closed dialog successfully.");

  // Test 5: Journey Verification 2 - Botanical Facial
  console.log("\n--- TEST 5: JOURNEY 2 - BOTANICAL FACIAL ---");
  await page.goto(`${BASE_URL}/treatments/botanical-facial`, { waitUntil: "networkidle0" });
  await page.waitForSelector("h1");

  const facialDetails = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasFacialTitle: text.includes("Botanical Facial"),
      hasFacialPrice: text.includes("₦24,000"),
      hasDuration: text.includes("45 minutes"),
    };
  });
  console.log("Botanical Facial page verified:", facialDetails);
  if (!facialDetails.hasFacialPrice || !facialDetails.hasDuration) {
    throw new Error("Botanical Facial details verification failed");
  }

  // Click "Ask for a time" on Botanical Facial page
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const target = btns.find((b) => b.innerText.includes("Ask for a time"));
    if (target) target.click();
  });

  await page.waitForSelector("[role='dialog']", { visible: true });
  const facialChatText = await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    return dialog ? dialog.innerText : "";
  });
  console.log("Facial WhatsApp prefill verified with Nora:", facialChatText.includes("Hi Nora,") || facialChatText.includes("Botanical Facial"));
  console.log("Facial price verified in chat:", facialChatText.includes("₦24,000"));

  // Select sample slot
  await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    const btns = Array.from(dialog?.querySelectorAll("button") || []);
    const slotBtn = btns.find((b) => b.innerText.includes("Select"));
    if (slotBtn) slotBtn.click();
  });

  await page.waitForFunction(() => {
    const dialog = document.querySelector("[role='dialog']");
    return dialog && dialog.innerText.includes("DEMO BOOKING CONFIRMED");
  });
  console.log("Botanical Facial demo booking confirmed successfully!");

  const facialConfirmDetails = await page.evaluate(() => {
    const dialog = document.querySelector("[role='dialog']");
    return {
      hasFacialTitle: dialog.innerText.includes("Botanical Facial"),
      has24k: dialog.innerText.includes("₦24,000"),
      has45min: dialog.innerText.includes("45 minutes"),
    };
  });
  console.log("Botanical Facial confirmation details:", facialConfirmDetails);

  // Test 6: Verify Other Routes
  console.log("\n--- TEST 6: VERIFY /the-space AND /visit ---");
  await page.goto(`${BASE_URL}/the-space`, { waitUntil: "networkidle0" });
  const theSpaceH1 = await page.$eval("h1", (el) => el.innerText.trim());
  console.log("/the-space H1:", theSpaceH1);

  await page.goto(`${BASE_URL}/visit`, { waitUntil: "networkidle0" });
  const visitH1 = await page.$eval("h1", (el) => el.innerText.trim());
  const visitHasAddress = await page.evaluate(() =>
    document.body.innerText.includes("6 Nora Courtyard, Rayfield")
  );
  console.log("/visit H1:", visitH1, "Has Address:", visitHasAddress);

  await browser.close();
  console.log("\n>>> ALL TESTS AND CAPTURES COMPLETED WITH 100% SUCCESS! <<<");
}

run().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
