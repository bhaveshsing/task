import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { S3Helper } from "@service/aws/s3";
import { Email } from '@service/aws/email.service'

export class AwsController {
  private responseParser: ResponseParser;
  private s3Service: S3Helper;
  private sendMail: Email;
  constructor() {
    this.responseParser = new ResponseParser();
    this.s3Service = new S3Helper();
    this.sendMail  = new Email();
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
    public upload = async (req: Request, res: Response): Promise<any> => {
        const response = true;
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    };

    public email = async (req: Request, res: Response): Promise<any> => {
      const data = {
        firstName: 'Bhavesh',
        otp: '123456'
      };
      await this.sendMail.sendTemplateMail(
        'bhavesh.singh@studiographene.com',
        'SES Testing',
        'reset-password',
        data
      );
      const response = true;
      this.responseParser
          .setStatus(true)
          .setHttpCode(constant.HTTP_STATUS_OK)
          .setBody(response)
          .setMessage(i18n.__("SUCCESS"))
          .send(res);
  };
}
