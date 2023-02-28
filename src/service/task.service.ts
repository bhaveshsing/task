import { getManager } from "typeorm";
import * as jwt from "jsonwebtoken";
import createError from "http-errors";
import { TaskRepo } from "@database/repository/task.repository";
import constant from "@config/constant";
import { BasicTaskResponse } from "@type/task";
import { JWT_SECRET } from "@config/secret";
import { TIMEZONE } from "@config/secret";
import i18n from "i18n";
import moment from "moment-timezone";
import asyncForEach from "@util/asyncForEach";
import { number } from "@hapi/joi";

export class TaskService {
    constructor() {
        moment.tz.setDefault(TIMEZONE);
    }
    /**
    * @param  {string} title task's title
    * @param  {string} description task's description
    * @returns Promise<BasicTaskResponse>
    */
    public async createTask(title: string, description: string): Promise<BasicTaskResponse> {
        const taskRepo = getManager().getCustomRepository(TaskRepo);
        const task = await taskRepo.save({ title, description });
        if(!task){
            throw new createError.NotFound(i18n.__("something_went_wrong"));
        }
        return task;
    }

    /**
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async getTask(id: string): Promise<BasicTaskResponse> {
        const taskRepo = getManager().getCustomRepository(TaskRepo);
        const task = await taskRepo.findOne({ id: id });
        if(!task){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        return task;
    }

    /**
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async updateTask(id: string, title: string, description: string, hours: number, status: number): Promise<BasicTaskResponse> {
        const taskRepo = getManager().getCustomRepository(TaskRepo);
        let task = await taskRepo.findOne({ id });
        if(!task){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        task = await taskRepo.save({ id: id, title, description, hours, status });
        return task;
    }

    /**
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async deleteTask(id: string): Promise<any> {
        const taskRepo = getManager().getCustomRepository(TaskRepo);
        let task = await taskRepo.findOne({ id });
        if(!task){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        const deltask = taskRepo.delete({ id });
        return true
    }

  /**
   * @param  {string} email user's email
   * @param  {string} password password
   * @returns Promise<CmsUser>
   */
//   public async create(email: string, password: string): Promise<CmsUser> {
//     const cmsUserRepo = getManager().getCustomRepository(CmsUserRepo);
//     const salt = await bcrypt.genSalt(constant.SALT_ROUNDS);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     return cmsUserRepo.save({ email, password: hashedPassword });
//   }


}
