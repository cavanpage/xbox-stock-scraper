import Mail, {Options as MailOptions} from 'nodemailer/lib/mailer';
import {createTransport, SentMessageInfo} from 'nodemailer';
import { config } from './config';
import notifier from 'node-notifier';
import { Builder, ThenableWebDriver } from 'selenium-webdriver';
const path = require('path');

const transporter: Mail = createTransport(config.email.transport);

export const log = (message: any) => {
    console.log(`${new Date()}: ${message}`);
}

export const notify = (subject: string, link?: string, isEmailEnabled?: boolean) => { 
  const joinedMessage: string = link !== undefined ? `${subject}: ${link}` : subject;
  notifier.notify({
      title: config.appName,
      message: joinedMessage,
      icon: path.join(__dirname, '../resources/xbox-icon.png')
  });
  
  if(isEmailEnabled){
    try{
      const message: MailOptions = {
        from: config.email.fromAddress,
        to: config.email.toAddress,
        subject,
        text: link !== undefined ? joinedMessage: subject
      }
      transporter.sendMail(message, (err: Error | null, info: SentMessageInfo) => {
        if(err){
          log({'error sending mail': err});
        }
        else{
          log('email sent successfully');
        }
      });
    }
    catch(e){
      log({'error sending email, make sure .env is setup correctly': e});
    }
  }
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const createWebDriver = async (): Promise<ThenableWebDriver> => {
  return await new Builder().forBrowser('chrome').build();
}
