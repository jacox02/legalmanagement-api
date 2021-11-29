import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduledMeets {
  @PrimaryGeneratedColumn()
  MeetID: number;
  @Column()
  VehicleID: number;
  @Column()
  VisitorID: number;
  @Column()
  MeetingDate: Date;
}
