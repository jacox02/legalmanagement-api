import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VehicleTypes {
  @PrimaryGeneratedColumn()
  VehicleTypeID: number;
  @Column()
  VehicleTypeName: string;
}
