import { Column, Model, Table } from 'sequelize-typescript';
import { Brand } from './VehicleBrands.entity';

@Table
export class VehicleModel extends Model {
  @Column({ primaryKey: true })
  ModelID: number;
  @Column
  ModelCode: string;
  @Column
  ModelName: string;
  @Column
  BrandID: string;

  // @ManyToOne(() => Vehicle, (vehicle) => vehicle.BrandID)
  // vehicle: Vehicle[];
}
