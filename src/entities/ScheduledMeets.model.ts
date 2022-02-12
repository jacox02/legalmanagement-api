import { Column, Model, Table } from 'sequelize-typescript';
@Table({ createdAt: false, updatedAt: false })
export class ScheduledMeet extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  MeetID: number;
  @Column
  VehicleID: number;
  @Column
  VisitorID: number;
  @Column
  MeetingDate: number;
}
