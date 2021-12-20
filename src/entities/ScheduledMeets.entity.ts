import { Column, Model, Table } from 'sequelize-typescript';
@Table
export class ScheduledMeet extends Model {
  @Column({ primaryKey: true })
  MeetID: number;
  @Column
  VehicleID: number;
  @Column
  VisitorID: number;
  @Column
  MeetingDate: number;
}
