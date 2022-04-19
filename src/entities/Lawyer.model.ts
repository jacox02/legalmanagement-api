import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'lawyers', createdAt: false, updatedAt: false })
export class Lawyer extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  LawyerID: number;
  @Column
  FullName: string;
  @Column
  Speciality: string;
}
