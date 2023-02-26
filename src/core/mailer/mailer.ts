import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailOption } from './dto/mailer.dto';
import { MAILER_SERVICE, MAILER_EMAIL, MAILER_PASSWORD } from '../../../env';

@Injectable()
export class MailerService {
  /**
   * Nodemailer Transposter
   * @date 2023-02-23
   * @param {any} {service:MAILER_SERVICE
   * @param {any} auth:{user:MAILER_EMAIL
   * @param {any} pass:MAILER_PASSWORD}
   * @param {any} }
   * @returns {any}
   */
  private transporter = nodemailer.createTransport({
    service: MAILER_SERVICE,
    auth: { user: MAILER_EMAIL, pass: MAILER_PASSWORD },
  });

  /**
   * Send Mail
   * @date 2023-02-23
   * @param {any} mailOption:MailOption
   * @returns {any}
   */
  async sendMail(mailOption: MailOption): Promise<any> {
    // await this.transporter.sendMail(mailOption);
  }
}
