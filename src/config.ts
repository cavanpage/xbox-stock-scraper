require('dotenv').config()
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface IXboxStockScraperConfig{
    email: {
        transport: SMTPTransport.Options,
        toAddress: string;
        fromAddress: string;
    } 
}

const {
    SMTP_HOST, 
    SMTP_PORT, 
    SMTP_AUTH_USER,
    SMTP_PASSWORD,
    EMAIL_TO="",
    EMAIL_FROM=""
} = process.env;

export const config: IXboxStockScraperConfig = {
    email: {
        transport: {
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            auth:{
              user: SMTP_AUTH_USER,
              pass: SMTP_PASSWORD
            }
        },
        toAddress: EMAIL_TO,
        fromAddress: EMAIL_FROM
    }
}