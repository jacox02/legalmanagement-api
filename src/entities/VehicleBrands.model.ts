import { Column, Model, Table } from 'sequelize-typescript';

@Table({ modelName: 'Brand', createdAt: false, updatedAt: false })
export class Brand extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  BrandID: number;
  @Column
  BrandCode: string;
  @Column
  BrandName: string;
}
