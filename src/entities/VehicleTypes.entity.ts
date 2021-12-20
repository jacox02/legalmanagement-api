import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class VehicleTypes extends Model {
  @Column({ primaryKey: true })
  VehicleTypeID: number;
  @Column
  VehicleTypeName: string;
}
