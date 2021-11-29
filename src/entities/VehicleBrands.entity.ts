import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VehicleBrands {
  @PrimaryGeneratedColumn()
  BrandID: number;
  @Column()
  BrandCode: string;
  @Column()
  BrandName: string;
}
