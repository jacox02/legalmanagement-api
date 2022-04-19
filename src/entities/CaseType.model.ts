import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'casetype', createdAt: false, updatedAt: false })
export class CaseType extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  TypeID: number;

  @Column
  Type: string;
}
