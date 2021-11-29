import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  ImageID: number;
  @Column()
  VehicleID: number;
  @Column()
  ImageUri: string;
}
