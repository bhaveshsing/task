import { Tasks } from "aws-sdk/clients/ecs";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Task } from './task.model'

@Entity("cms_users")
export class CmsUser {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @CreateDateColumn({
    select: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: false,
  })
  public updatedAt: Date;

  @OneToMany(type => Task, task => task.cmsuser, { cascade: true })
  task: Task
}
