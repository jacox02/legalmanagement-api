import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'casetype', createdAt: false, updatedAt: false })
export class MaritalStatus extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  StatusID: number;

  @Column
  Status: string;
}
