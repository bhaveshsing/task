import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Task } from './task.model';
import { UserDetails } from './user-deatil.model';

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

  @OneToMany(type => Task, task => task.cmsuser , {lazy: true, cascade: true})
  task: Promise<Task[]>

  @OneToOne(type => Task, task => task.cmsuser , {eager: true, cascade: true})
  userDetail: UserDetails
}
