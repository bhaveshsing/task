import { SES } from 'aws-sdk';
import expressHandlebars from 'express-handlebars';
import { AWS_S3_REGION, FROM_EMAIL, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '@config/secret';
import createError from 'http-errors';
import path from 'path';
import * as aws from 'aws-sdk';

aws.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export class Email {
  private ses: SES;

  private hbs;
  public constructor() {
    this.ses = new aws.SES({
      region: AWS_S3_REGION,
    });

    this.hbs = expressHandlebars.create({
      extname: '.handlebars',
      partialsDir: [`${__dirname}/../../../mail-templates/`],
    });
  }

  public async sendTemplateMail(
    to: string,
    subject: string,
    templateName: string,
    data: Record<string, unknown>
  ): Promise<void> {
    try {
      const templatePath = path.resolve(__dirname, '../../../mail-template', `${templateName}.handlebars`);
      const html = await this.hbs.render(templatePath, data);
      await this.send(to, subject, '', html);
    } catch (error: any) {
        console.log(error)
      throw new createError.InternalServerError("SOMETHING_WENT_WRONG");
    }
  }
    
  public async send(to: string, subject: string, message: string, htmlMessage: string): Promise<any> {
      const params: SES.Types.SendEmailRequest = {
        Destination: {
          ToAddresses: Array.isArray(to) ? [...to] : [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: htmlMessage,
            },
            Text: {
              Charset: 'UTF-8',
              Data: message,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        Source: FROM_EMAIL,
      };
      return this.ses.sendEmail(params).promise();
    } catch (error: any) {
        console.log(error)
      throw new createError.InternalServerError("SOMETHING_WENT_WRONG");
    }
}
