import { Controller, Get } from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService,
    private mailerService: MailerService
  ) {

  }

  @Get()
  @Public()
  @ResponseMessage("Test email")
  async handleTestEmail() {
    await this.mailerService.sendMail({
      to: "someone@gmail.com",
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'new-job',
      context: {
        receiver: "Thang",
        job: "IT",
        url: "XXXXXXXXXXXXXXXXXXXXX"
      }
    });
  }

}
