import express from "express";
import { AwsController } from "@api/controller/aws.controller";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { AuthenticateRequest } from "@middleware/authenticate-request";
// import { S3Helper } from '@service/aws/s3'
import * as aws from 'aws-sdk';
import { S3Helper } from "@service/aws/s3";

class AwsRoute {
    public router: express.Router = express.Router();
    private awsController: AwsController;
    private s3service: S3Helper;
    private httpRequestValidator: HttpRequestValidator;
    private authenticate;

    constructor() {
        this.awsController = new AwsController();
        this.s3service = new S3Helper();
        this.httpRequestValidator = new HttpRequestValidator();
        const authMiddleware = new AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.assign();
    }

    private assign() {
        this.router.post(
            "/upload",
            this.s3service.uploadImage,
            this.awsController.upload
        );

        this.router.get(
            "/email",
            this.awsController.email
        );
    }
}

export default new AwsRoute().router;
