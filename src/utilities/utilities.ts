import { BESTBUY_URL, config, GAMESTOP_URL, NEWEGG_URL, TARGET_URL, WALMART_URL } from "../config";

import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { sendEmail } from "../notifications/email";
import { sendDiscordMessage } from "../notifications/discord";
import { Carrier, IMonitorConfig } from "../interfaces";
import { bestBuyHandler, gamestopHandler, neweggHandler, targetHandler, walmartHandler } from "../handlers";
require("chromedriver");

const handlerConfigs: Record<Carrier | string, IMonitorConfig> = {
  [Carrier.WALMART]: { 
    name: Carrier.WALMART,
    url: WALMART_URL,
    refreshRateMs: 5000000,
    inStockHandler: walmartHandler
  },
  [Carrier.NEWEGG]: { 
    name: Carrier.NEWEGG,
    url: NEWEGG_URL,
    inStockHandler: neweggHandler
  },
  [Carrier.GAMESTOP]: { 
    name: Carrier.GAMESTOP,
    url: GAMESTOP_URL,
    inStockHandler: gamestopHandler
  },
  [Carrier.BESTBUY]: { 
    name: Carrier.BESTBUY,
    url: BESTBUY_URL,
    inStockHandler: bestBuyHandler
  },
  [Carrier.TARGET]: { 
    name: Carrier.TARGET,
    url: TARGET_URL,
    inStockHandler: targetHandler
  }
};

export const log = (message: any) => {
  console.log(`${new Date()}: ${message}`);
};

export const error = (message: any) => {
  console.error(`${new Date()}: ${message}`)
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const createWebDriver = async (): Promise<ThenableWebDriver> => {
  return await new Builder().forBrowser("chrome").build();
};

export const getAllHandlerConfigs = (): IMonitorConfig[] => {
  return Object.values(handlerConfigs);
}
