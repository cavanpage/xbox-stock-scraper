import SMTPTransport from "nodemailer/lib/smtp-transport";
import dontenv from 'dotenv';
import path from 'path';

dontenv.config({path: path.resolve(__dirname, '../dotenv')});

interface IXboxStockScraperConfig {
  appName: string;
  email: {
    transport: SMTPTransport.Options;
    toAddress: string;
    fromAddress: string;
  };
  walmartUrl: string;
  neweggUrl: string;
  gamestopUrl: string;
  bestbuyUrl: string;
  targetUrl: string;
  discordHookUrl: string;
}

export const {
  WALMART_URL = "https://www.walmart.com/ip/Xbox-Series-X/443574645?irgwc=1&sourceid=imp_1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&veh=aff&wmlspartner=imp_1943169&clickid=1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&sharedid=&affiliates_ad_id=565706&campaign_id=9383",
  NEWEGG_URL = "https://www.newegg.com/p/N82E16868105273",
  GAMESTOP_URL = "https://www.gamestop.com/video-games/xbox-series-x/consoles/products/xbox-series-x/B224744V.html",
  BESTBUY_URL = "https://www.bestbuy.com/site/microsoft-xbox-series-x-1tb-console-black/6428324.p?skuId=6428324",
  TARGET_URL = "https://www.target.com/p/xbox-series-x-console/-/A-80790841",
  DISCORD_WEBHOOK_URL = "",
  SMTP_HOST,
  SMTP_PORT,
  SMTP_AUTH_USER,
  SMTP_AUTH_PASSWORD,
  EMAIL_TO = "",
  EMAIL_FROM = ""
} = process.env;

export const config: IXboxStockScraperConfig = {
  appName: "Xbox Stock Scraper",
  walmartUrl: WALMART_URL,
  neweggUrl: NEWEGG_URL,
  gamestopUrl: GAMESTOP_URL,
  bestbuyUrl: BESTBUY_URL,
  targetUrl: TARGET_URL,
  discordHookUrl: DISCORD_WEBHOOK_URL,
  email: {
    transport: {
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      auth: {
        user: SMTP_AUTH_USER,
        pass: SMTP_AUTH_PASSWORD
      }
    },
    toAddress: EMAIL_TO,
    fromAddress: EMAIL_FROM
  }
};
