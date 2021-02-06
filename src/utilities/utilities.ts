import { BESTBUY_URL, config, GAMESTOP_URL, NEWEGG_URL, TARGET_URL, WALMART_URL } from "../config";
import notifier from "node-notifier";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { sendEmail } from "./email";
import { sendDiscordMessage } from "./discord";
import { Carrier, IMonitorConfig } from "../interfaces";
import { bestBuyHandler, gamestopHandler, neweggHandler, targetHandler, walmartHandler } from "../handlers";
require("chromedriver");
const path = require("path");

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

export const notify = (
  subject: string,
  link?: string,
  shouldSendEmail?: boolean,
  shouldNotifyDiscord?: boolean
) => {

  const joinedMessage: string =
    link !== undefined ? `${subject}: ${link}` : subject;

  log(subject);

  notifier.notify({
    title: config.appName,
    message: joinedMessage,
    icon: path.join(__dirname, "../resources/xbox-icon.png"),
  });

  if (shouldSendEmail) {
    sendEmail(subject, joinedMessage);
  }

  if (shouldNotifyDiscord) {
    sendDiscordMessage(joinedMessage);
  }
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
