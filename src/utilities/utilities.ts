import { config } from "../config";
import notifier from "node-notifier";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { sendEmail } from "./email";
import { sendDiscordMessage } from "./discord";
const path = require("path");

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
