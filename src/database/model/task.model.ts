import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";

import { CmsUser } from './cms-user.model'

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ unique: false })
  public title: string;

  @Column()
  public description: string;

  @Column()
  public hours: number;

  @Column()
  public status: number;

  @CreateDateColumn({
    select: false
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: false
  })
  public updatedAt: Date;

  @Column()
  public cmsuser_id: string;

  @ManyToOne((type) => CmsUser, cmsuser => cmsuser.task)
  @JoinColumn({referencedColumnName: 'id', name: "cmsuser_id" })
  public cmsuser: CmsUser;
}
