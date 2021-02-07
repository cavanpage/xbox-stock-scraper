import { log } from "../utilities";
import { sendDiscordMessage } from "./discord";
import { sendEmail } from "./email";
const path = require("path");
import notifier from "node-notifier";
import { config } from "../config";

export const notify = (
  subject: string,
  link?: string,
  shouldSendEmail?: boolean,
  shouldNotifyDiscord?: boolean,
  appName: string = config.appName
) => {
  const joinedMessage: string =
    link !== undefined ? `${subject}: ${link}` : subject;

  log(subject);

  notifier.notify({
    title: appName,
    message: joinedMessage,
    icon: path.join(__dirname, "../../resources/xbox-icon.png")
  });

  if (shouldSendEmail) {
    sendEmail(subject, joinedMessage);
  }

  if (shouldNotifyDiscord) {
    sendDiscordMessage(joinedMessage);
  }
};
