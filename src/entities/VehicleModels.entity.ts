import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Brand } from './VehicleBrands.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  ModelID: number;
  @Column()
  BrandID: number;
  @Column()
  ModelCode: string;
  @Column()
  ModelName: string;

  // @ManyToOne(() => Brand, (brand) => brand.Models)
  // brand: Brand;
}
