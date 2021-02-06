import Mail, { Options as MailOptions } from "nodemailer/lib/mailer";
import { createTransport, SentMessageInfo } from "nodemailer";
import { config } from "../config";
import { error, log } from "./utilities";

const transporter: Mail = createTransport(config.email.transport);

export const sendEmail = (subject: string, body: string) => {
  try {
    const message: MailOptions = {
      from: config.email.fromAddress,
      to: config.email.toAddress,
      subject,
      text: body,
    };

    transporter.sendMail(
      message,
      (err: Error | null, info: SentMessageInfo) => {
        if (err) {
          log({ "error sending mail": err });
        } else {
          log("email sent successfully");
        }
      }
    );
  } catch (e) {
    error({ "error sending email, make sure .env is setup correctly": e });
  }
};
