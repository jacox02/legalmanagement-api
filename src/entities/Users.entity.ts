import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class User extends Model {
  @Column({ primaryKey: true })
  id: number;

  @Column
  firstName: string;

  @Column
  password: string;

  @Column
  mainEmail: string;

  @Column
  recoveryEmail: string;

  @Column
  lastName: string;

  @Column
  isActive: boolean;
}
