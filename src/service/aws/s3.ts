import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_S3_REGION } from '@config/secret';
import multer from "multer";
import multerS3 from "multer-s3";
import { Request, Response, NextFunction } from 'express';
import createError from "http-errors";
import * as aws from 'aws-sdk'
import { S3Client } from "@aws-sdk/client-s3";

export class S3Helper {
    private s3: S3Client;
    static uploader: any;
    public upload: any;
    public constructor() {
        aws.config.update({
        region: AWS_S3_REGION,
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      });
      this.s3 = new S3Client({
        region: AWS_S3_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      })
    }
  
    public uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        const awsBucketName = AWS_BUCKET_NAME || '';
        this.upload = multer({
          storage: multerS3({
            acl: 'public-read',
            s3: this.s3,
            bucket: awsBucketName,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key(request, file, cb) {
              const newFileName = `${Date.now()}-${file.originalname}`;
              const fullPath = `/${newFileName}`;
              return cb(null, fullPath);
            },
          }),
        }).array('file', 6);
        await this.upload(req, res);
        req.body.files = req.files;
        next();
        return;
      } catch (error: any) {
        throw new createError.InternalServerError("SOMETHING_WENT_WRONG");
      }
    };
}
