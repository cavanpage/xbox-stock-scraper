import axios from "axios";
import { config } from "../config";
import { log } from "./utilities";

export const sendDiscordMessage = (message: string) => {
  if (config.discordHookUrl) {
    axios.post(config.discordHookUrl, { content: message });
  } else {
    log(
      "issue sending discord message, please update .env file with web hook url"
    );
  }
};
