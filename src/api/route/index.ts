import { Application } from "express";

import { AuthenticateRequest } from "@middleware/authenticate-request";

import BaseRoute from "./base.route";
import CmsRoute from "./cms.route";
import TaskRoute from "./task.route";
import AwsRoute from "./aws.route";
export class Routes {
  private authenticate;
  constructor() {
    const authMiddleware = new AuthenticateRequest();
    this.authenticate = authMiddleware.validate;
  }
  public routes(app: Application): void {
    // resource and routes mapping comes here
    app.use("/cms", CmsRoute);
    app.use(BaseRoute);
    app.use('/task', TaskRoute);
    app.use('/aws', AwsRoute);
  }
}
