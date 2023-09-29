import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: string;

  @Column()
  dob!: string;

  @Column()
  email!: string;

  @Column()
  mob!: string;

  @Column()
  gender!: string;

  @Column()
  department!: string;

  @Column({ nullable: false })
  active!: boolean;
}