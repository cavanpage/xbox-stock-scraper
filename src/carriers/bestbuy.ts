require("chromedriver");
import { By } from "selenium-webdriver";
import { config } from "../config";
import { createWebDriver, error, log, notify, sleep } from "../utilities";

export const monitorBestbuy = async () => {
  const url: string = config.bestbuyUrl;
  const driver = await createWebDriver();

  try {
    while (true) {
      log("bestbuy: checking");
      await driver.get(url);
      const addToCartButton = await driver.findElements(By.css(".add-to-cart-button"));
      const isInStock = await addToCartButton[0].isEnabled();

      if (isInStock) {
        notify("bestbuy: in stock", url, true, true);
        log("bestbuy: in stock");
      } else {
        log("bestbuy: out of stock");
      }
      await sleep(60000);
    }
  } catch (e) {
    error({ "bestbuy:error": e });
  } finally {
    await driver.quit();
  }
};
