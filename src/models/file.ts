import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  name!: string;

  @Column()
  file_extension!: string;

  @Column()
  MIME_type!: string;

  @Column()
  size!: number;

  @CreateDateColumn()
  date!: Date;
}