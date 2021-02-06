require('dotenv').config()
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IXboxStockScraperConfig{
    appName: string,
    email: {
        transport: SMTPTransport.Options,
        toAddress: string;
        fromAddress: string;
    },
    walmartUrl: string,
    neweggUrl: string,
    gamestopUrl: string
}

const {
    WALMART_URL="https://www.walmart.com/ip/Xbox-Series-X/443574645?irgwc=1&sourceid=imp_1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&veh=aff&wmlspartner=imp_1943169&clickid=1aLSaF3F%3AxyLRYawUx0Mo36aUkEWTcXRQ1spz40&sharedid=&affiliates_ad_id=565706&campaign_id=9383",
    NEWEGG_URL="https://www.newegg.com/p/N82E16868105273",
    GAMESTOP_URL="https://www.gamestop.com/video-games/xbox-series-x/consoles/products/xbox-series-x/B224744V.html",
    SMTP_HOST, 
    SMTP_PORT, 
    SMTP_AUTH_USER,
    SMTP_AUTH_PASSWORD,
    EMAIL_TO="",
    EMAIL_FROM=""   
} = process.env;

export const config: IXboxStockScraperConfig = {
    appName: 'Xbox Stock Scraper',
    walmartUrl: WALMART_URL,
    neweggUrl: NEWEGG_URL,
    gamestopUrl: GAMESTOP_URL,
    email: {
        transport: {
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            auth:{
              user: SMTP_AUTH_USER,
              pass: SMTP_AUTH_PASSWORD
            }
        },
        toAddress: EMAIL_TO,
        fromAddress: EMAIL_FROM
    }
}