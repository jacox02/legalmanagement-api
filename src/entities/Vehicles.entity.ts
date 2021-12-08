import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './Photo.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  VehicleID: number;
  @Column({ default: 0 })
  VehicleBrandID: number;
  @Column({ default: 0 })
  VehicleModelID: number;
  @Column({ default: 1 })
  VehicleTypeID: number;
  @Column({ default: 1999 })
  VehicleYear: number;
  @Column({ default: 999999 })
  VehiclePrice: number;
  @Column({ default: false })
  VehicleOnRent: boolean;
  @Column({ default: false })
  VehicleDescription: string;
  // @OneToMany(() => Photo, (photo) => photo.vehicle)
  // photos?: Photo[];
}
