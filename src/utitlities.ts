import Mail, {Options as MailOptions} from 'nodemailer/lib/mailer';
import {createTransport, SentMessageInfo} from 'nodemailer';
import { config } from './config';

const transporter: Mail = createTransport(config.email.transport);

export const log = (message: any) => {
    console.log(`${new Date()}: ${message}`);
}

export const notify = (subject: string, body: string) => {
  const message: MailOptions = {
    from: config.email.fromAddress,
    to: config.email.toAddress,
    subject,
    text: body
  }
  transporter.sendMail(message, (err: Error | null, info: SentMessageInfo) => {
    if(err){
      log({'error sending mail': err});
    }
    else{
      log('email sent successfully');
    }
  });
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
