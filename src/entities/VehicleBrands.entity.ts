import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Model } from './VehicleModels.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  BrandID: number;
  @Column()
  BrandCode: string;
  @Column()
  BrandName: string;
  @Column()
  Models: string[];

  @OneToMany(() => Model, (models) => models.brand)
  models: Model[];
}
