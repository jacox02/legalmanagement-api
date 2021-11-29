import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VehicleModels {
  @PrimaryGeneratedColumn()
  ModelID: number;
  @Column()
  BrandID: number;
  @Column()
  ModelCode: string;
  @Column()
  ModelName: string;
}
