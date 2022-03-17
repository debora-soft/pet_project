import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryColumn({unique: true})
  id!: string;

  @Column()
  password!: string;

  @Column({default: ''})
  token?:string;

  @Column({default: ''})
  refreshToken?: string;
  }