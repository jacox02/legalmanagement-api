import { Column, IsEmail, Model, Table } from 'sequelize-typescript';
@Table({ createdAt: false, updatedAt: false })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  UserID: number;

  @Column
  FirstName: string;

  @Column
  Password: string;

  @IsEmail
  @Column
  MainEmail: string;

  @IsEmail
  @Column
  RecoveryEmail: string;

  @Column
  LastName: string;

  @Column
  IsActive: boolean;
}
