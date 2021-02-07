import { IMonitorConfig } from "../interfaces";
import { notify } from "../notifications";
import { createWebDriver, error, log, sleep } from "../utilities";

export const monitor = async ({
  name,
  url,
  inStockHandler,
  refreshRateMs = 120000
}: IMonitorConfig): Promise<void> => {
  const prependCarrier = (message: any): string => {
    return `${name}: ${message}`;
  };
  const logInfo = (message: string): void => {
    log(prependCarrier(message));
  };

  const driver = await createWebDriver();

  try {
    while (true) {
      logInfo("checking");
      await driver.get(url);
      const isInStock = await inStockHandler(driver);

      if (isInStock) {
        notify(prependCarrier("in stock"), url, true, true);
      } else {
        logInfo(`out of stock`);
      }
      await sleep(refreshRateMs);
    }
  } catch (e) {
    error(prependCarrier(e));
  } finally {
    await driver.quit();
    monitor({name, url, inStockHandler, refreshRateMs});
  }
};
