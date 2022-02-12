import { Column, Model, Table } from 'sequelize-typescript';

@Table({ createdAt: false, updatedAt: false })
export class VehicleTypes extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  VehicleTypeID: number;
  @Column
  VehicleTypeName: string;
}
