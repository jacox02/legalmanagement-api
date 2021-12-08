import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  password: string;

  @Column()
  mainEmail: string;

  @Column()
  recoveryEmail: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
