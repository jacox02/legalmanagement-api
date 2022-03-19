import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Vehicle } from './Vehicles.model';

@Table({ createdAt: false, updatedAt: false })
export class Photo extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  PhotoID: number;

  @Column
  PhotoUri: string;

  @ForeignKey(() => Vehicle)
  @Column
  VehicleID: number;

  @BelongsTo(() => Vehicle)
  Vehicle: Vehicle;
}
