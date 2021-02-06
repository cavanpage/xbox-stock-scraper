import axios from "axios";
import { config } from "../config";
import { error, log } from "../utilities/utilities";

export const sendDiscordMessage = (message: string) => {
  if (config.discordHookUrl) {
    axios.post(config.discordHookUrl, { content: message });
  } else {
    error(
      "issue sending discord message, please update .env file with web hook url"
    );
  }
};
