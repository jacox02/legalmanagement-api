import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class Brand extends Model {
  @Column({ primaryKey: true })
  BrandID: number;
  @Column
  BrandCode: string;
  @Column
  BrandName: string;
}
