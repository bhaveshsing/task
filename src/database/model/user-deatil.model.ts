import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne
  } from "typeorm";
  
  import { CmsUser } from './cms-user.model'
  
  @Entity("user_deatils")
  export class UserDetails {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @Column({ unique: false })
    public first_name: string;
  
    @Column()
    public last_namw: string;
  
    @Column()
    public cmsuser_id: string;
  
    @OneToOne((type) => CmsUser, cmsuser => cmsuser.userDetail)
    public cmsuser: CmsUser;

    @CreateDateColumn({
      select: false
    })
    public createdAt: Date;
  
    @UpdateDateColumn({
      select: false
    })
    public updatedAt: Date;
  }
  