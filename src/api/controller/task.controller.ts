import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { TaskService } from "@service/task.service";

export class TaskController {
  private responseParser: ResponseParser;
  private taskService: TaskService;

  constructor() {
    this.responseParser = new ResponseParser();
    this.taskService = new TaskService();
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
    public createTask = async (req: Request, res: Response): Promise<void> => {
        const {
            body: { title, description },
        } = req;
        const response = await this.taskService.createTask(title, description);
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    };

    /**
    * @param  {Request} req
    * @param  {Response} res
    * @returns void
    */
    public getTask = async (req: Request, res: Response): Promise<void> => {
        const {
            params: { id },
        } = req;
        const response = await this.taskService.getTask(id);
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    };
    
    /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
    public updateTask = async (req: Request, res: Response): Promise<void> => {
        const {
            body: { id, title, description, hours, status },
        } = req;
        const response = await this.taskService.updateTask(id, title, description, hours, status);
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    }
    
    /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
    public deleteTask = async (req: Request, res: Response): Promise<void> => {
        const {
            params: { id },
        } = req;
        const response = await this.taskService.deleteTask(id);
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    }

    /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns boolean
   */
    public assignTask = async (req: Request, res: Response): Promise<void> => {
        const {
            body: { id, cmsuser_id },
        } = req;
        const response = await this.taskService.assignTask(id, cmsuser_id);
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    }

    /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
    public leftJoin = async (req: Request, res: Response): Promise<void> => {
        
        const response = await this.taskService.leftJoin();
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    }
    
    /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
    public innerJoin = async (req: Request, res: Response): Promise<void> => {
        const {
            body: { id, cmsuser_id },
        } = req;
        const response = await this.taskService.innerJoin();
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(response)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    }
}
