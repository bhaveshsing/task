import { EntityRepository, Repository } from "typeorm";
import { Task } from "@database/model/task.model";

@EntityRepository(Task)
export class TaskRepo extends Repository<Task> {}
