import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailOption } from './dto/mailer.dto';
import { MAILER_SERVICE, MAILER_EMAIL, MAILER_PASSWORD } from '../../../env';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: MAILER_SERVICE,
    auth: { user: MAILER_EMAIL, pass: MAILER_PASSWORD },
  });

  async sendMail(mailOption: MailOption): Promise<any> {
    await this.transporter.sendMail(mailOption);
  }
}
