import express from "express";
import { TaskController } from "@api/controller/task.controller";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import {
    createTask, deleteTask, getTask, updateTask
} from "@api/validator/task.validator";
import { AuthenticateRequest } from "@middleware/authenticate-request";
import { get } from "http";

class TaskRoute {
    public router: express.Router = express.Router();
    private taskController: TaskController;
    private httpRequestValidator: HttpRequestValidator;
    private authenticate;

    constructor() {
        this.taskController = new TaskController();
        this.httpRequestValidator = new HttpRequestValidator();
        const authMiddleware = new AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.assign();
    }

    private assign() {
        this.router.post(
            "/create",
            this.httpRequestValidator.validate("body", createTask),
            this.taskController.createTask
        );

        this.router.get(
            "/read/:id",
            this.httpRequestValidator.validate("params", getTask),
            this.taskController.getTask
        );

        this.router.post(
            "/update",
            this.httpRequestValidator.validate("body", updateTask),
            this.taskController.updateTask
        );

        this.router.delete(
            "/delete/:id",
            this.httpRequestValidator.validate("params", deleteTask),
            this.taskController.deleteTask
        );
    }
}

// class BaseRoute {
//   public router: express.Router = express.Router();
//   private baseController: BaseController;
//   private httpRequestValidator: HttpRequestValidator;
//   private authenticate;

//   constructor() {
//     this.baseController = new BaseController();
//     this.httpRequestValidator = new HttpRequestValidator();
//     const authMiddleware = new AuthenticateRequest();
//     this.authenticate = authMiddleware.validate;
//     this.assign();
//   }

//   private assign() {

//     this.router.post(
//       "/register",
//       this.httpRequestValidator.validate("body", register),
//       this.baseController.register
//     );

//     this.router.get(
//         "/user-email-verification/:uniqueKey",
//         // this.httpRequestValidator.validate("query", verifyOtp),
//         this.baseController.verifyUserEmail
//       );

//     this.router.post(
//       "/login",
//       this.authenticate,
//       this.httpRequestValidator.validate("body", login),
//       this.baseController.login
//     );
//     this.router.get("/", this.baseController.defaultCheck);
//   }
// }

export default new TaskRoute().router;
