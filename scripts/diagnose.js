const puppeteer = require("puppeteer-core");

async function check() {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on("console", (msg) => console.log("PAGE CONSOLE:", msg.type(), msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

  const res = await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  console.log("HTTP Status:", res.status());
  console.log("Title:", await page.title());
  const h1 = await page.$eval("h1", (el) => el.innerText);
  console.log("Rendered H1:", JSON.stringify(h1));

  await page.screenshot({ path: "rendered-check.webp", type: "webp" });
  console.log("Screenshot saved successfully.");

  await browser.close();
}

check().catch((e) => console.error(e));
