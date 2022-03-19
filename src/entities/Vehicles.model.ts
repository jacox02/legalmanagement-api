import {
  Column,
  HasMany,
  Model,
  BelongsTo,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Photo } from './Photo.model';
import { Brand } from './VehicleBrands.model';
import { VehicleModel } from './VehicleModels.model';
import { VehicleTypes } from './VehicleTypes.model';

@Table({ createdAt: false, updatedAt: false })
export class Vehicle extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  VehicleID: number;

  @Column
  VehicleYear: number;

  @Column
  VehiclePrice: number;

  @Column
  VehicleOnRent: boolean;

  @Column
  VehicleDescription: string;

  @Column({ unique: true })
  VIN: string;

  @Column({ unique: true })
  Identifier: string;

  @HasMany(() => Photo, { onDelete: 'cascade' })
  Photos: Photo[];

  @BelongsTo(() => Brand)
  Brand: Brand;
  @BelongsTo(() => VehicleTypes)
  Type: VehicleTypes;
  @BelongsTo(() => VehicleModel)
  Model: VehicleModel;

  @ForeignKey(() => VehicleTypes)
  TypeID: VehicleTypes;
  @ForeignKey(() => Brand)
  BrandID: Brand;
  @ForeignKey(() => VehicleModel)
  ModelID: VehicleModel;
}
