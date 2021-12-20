import { Column, Model, Table } from 'sequelize-typescript';

import { Brand } from './VehicleBrands.entity';
import { VehicleModel } from './VehicleModels.entity';
import { VehicleTypes } from './VehicleTypes.entity';
@Table
export class Vehicle extends Model {
  @Column({ primaryKey: true })
  VehicleID: number;

  @Column
  VehicleTypeID: number;

  @Column
  VehicleYear: number;

  @Column
  VehiclePrice: number;

  @Column
  VehicleOnRent: boolean;

  @Column
  VehicleDescription: string;

  @Column
  BrandID: number;

  @Column
  vehicleType: number;

  @Column
  VehicleModelID: number;
}
