import { getManager } from "typeorm";
import * as jwt from "jsonwebtoken";
import createError from "http-errors";
import { TaskRepo } from "@database/repository/task.repository";
import { CmsUserRepo } from "@database/repository/cms-user.repository";
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
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async assignTask(id: string, cmsuser_id: string): Promise<any> {
        const taskRepo = getManager().getCustomRepository(TaskRepo);
        let task = await taskRepo.findOne({ id: id });
        if(!task){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        const assign = taskRepo.update({ id: id },{cmsuser_id: cmsuser_id});
        console.log(assign);
        return true
    }

    /**
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async leftJoin(): Promise<any> {
        const taskRepo = getManager().getCustomRepository(TaskRepo);
        let task = await taskRepo.createQueryBuilder('tasks').leftJoin('tasks.cmsuser','cmsuser').select(['tasks.id','cmsuser.email']).getMany();
        if(!task){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        return task
    }

    /**
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async innerJoin(): Promise<any> {
        const taskRepo = getManager().getCustomRepository(TaskRepo);
        let task = await taskRepo.createQueryBuilder('tasks').innerJoinAndSelect('tasks.cmsuser','cmsuser').addSelect(['tasks.cmsuser.id']).getMany();
        if(!task){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        return task
    }

    /**
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async lazyExample(): Promise<any> {
        const cmsUserRepo = getManager().getCustomRepository(CmsUserRepo);
        const user = await cmsUserRepo.findOne();
        const task = await user.task;
        if(!user){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        return { user, task }
    }

    /**
    * @param  {string} id task's id
    * @returns Promise<BasicTaskResponse>
    */
    public async eagerExample(): Promise<any> {
        const cmsUserRepo = getManager().getCustomRepository(CmsUserRepo);
        // const user = await cmsUserRepo.findOne();// get all 
        const user = await cmsUserRepo.findOne({ relations: ['userDetail'] });
        if(!user){
            throw new createError.NotFound(i18n.__("invalid_id"));
        }
        return user;
    }
}
