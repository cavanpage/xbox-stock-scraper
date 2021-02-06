require("chromedriver");
import { By } from "selenium-webdriver";
import { config } from "../config";
import { createWebDriver, error, log, notify, sleep } from "../utilities";

export const monitorTarget = async () => {
  const url: string = config.targetUrl;
  const driver = await createWebDriver();

  try {
    while (true) {
      log("target: checking");
      await driver.get(url);
      const soldOutBlocks = await driver.findElements(By.css("div[data-test='soldOutBlock']"));
      const isInStock = soldOutBlocks.length == 0;

      if (isInStock) {
        notify("target: in stock", url, true, true);
        log("target: in stock");
      } else {
        log("target: out of stock");
      }
      await sleep(30000);
    }
  } catch (e) {
    error({ "target:error": e });
  } finally {
    await driver.quit();
  }
};
