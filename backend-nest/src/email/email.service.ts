import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

@Injectable()
export class EmailService {
  private transporter?: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {}

  async send(message: EmailMessage) {
    const user = this.config.get<string>('SMTP_USER');
    const password = this.config.get<string>('SMTP_PASS');

    if (!user || !password) {
      throw new ServiceUnavailableException(
        'Email delivery is not configured. Contact platform support.',
      );
    }

    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: this.config.get<string>('SMTP_HOST') ?? 'smtp.gmail.com',
        port: Number(this.config.get<string>('SMTP_PORT') ?? 465),
        secure: this.config.get<string>('SMTP_SECURE') !== 'false',
        auth: { user, pass: password },
      });
    }

    await this.transporter.sendMail({
      from: this.config.get<string>('SMTP_FROM') ?? user,
      ...message,
    });

    return { delivered: true, development: false };
  }
}
