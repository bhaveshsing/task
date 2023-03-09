import express from "express";
import { TaskController } from "@api/controller/task.controller";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import {
    assignTask,
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

        this.router.post(
            "/assign",
            this.httpRequestValidator.validate("body", assignTask),
            this.taskController.assignTask
        );

        this.router.get(
            "/left",
            // this.httpRequestValidator.validate("body", assignTask),
            this.taskController.leftJoin
        );

        this.router.get(
            "/inner",
            // this.httpRequestValidator.validate("body", assignTask),
            this.taskController.innerJoin
        );

        this.router.get(
            "/lazy",
            // this.httpRequestValidator.validate("body", assignTask),
            this.taskController.lazyExample
        );

        this.router.get(
            "/eager",
            // this.httpRequestValidator.validate("body", assignTask),
            this.taskController.eagerExample
        );
    }
}

export default new TaskRoute().router;
