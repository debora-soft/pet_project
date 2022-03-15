import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  passwoard!: string;

  @Column()
  token?:string;

  @Column()
  refreshToken?: string;
  }