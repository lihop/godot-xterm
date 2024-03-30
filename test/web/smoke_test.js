const { chromium } = require("playwright");
const express = require("express");

(async () => {
  // Server setup.
  const app = express();
  const port = 3000;
  app.use(
    express.static("../../docs/demo", {
      setHeaders: (res, path, stat) => {
        res.set("Cross-Origin-Embedder-Policy", "require-corp");
        res.set("Cross-Origin-Opener-Policy", "same-origin");
      },
    }),
  );

  const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  // Determine whether to set the executablePath.
  const launchOptions = {};
  if (process.env.GODOT_XTERM_CHROME_PATH) {
    launchOptions.executablePath = process.env.GODOT_XTERM_CHROME_PATH;
  }

  // Launch the browser with conditional executablePath.
  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage();

  let loggedMessages = [];
  page.on("console", (msg) => {
    loggedMessages.push(msg.text());
  });

  await page.goto(`http://localhost:${port}`);

  // TODO: Don't wait for a fixed amount of time, but rather for a baseline screenshot to match.
  await page.waitForTimeout(5000);

  // Page interaction
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.keyboard.type('window.console.log("It works!")');
  await page.keyboard.press("Enter");

  // Close the browser
  await browser.close();

  const hasItWorkedLog = loggedMessages.some((message) =>
    message.includes("It works!"),
  );
  if (!hasItWorkedLog) {
    console.error("Test failed: 'It works!' was not logged to the console.");
  } else {
    console.log("Test passed: 'It works!' was successfully logged.");
  }

  // Stop the server
  server.close(() => {
    console.log("Server stopped");
    process.exit(hasItWorkedLog ? 0 : 1);
  });
})();
