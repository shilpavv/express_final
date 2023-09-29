import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  userName!: string;

  @Column()
  password!: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    if (this.password && unencryptedPassword) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
    return false; 
  }
}
