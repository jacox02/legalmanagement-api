import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { MaritalStatus } from './MaritalStatus.model';
import { Lawyer } from './Lawyer.model';

@Table({ modelName: 'clients', createdAt: false, updatedAt: false })
export class Client extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  ClientID: number;
  @Column
  Firstname: string;
  @Column
  Lastname: string;
  @Column
  Email: string;
  @Column
  IdentificationID: string;
  @Column
  PhoneNumber: string;
  @Column
  Phone: string;
  @Column
  Address: string;

  @BelongsTo(() => MaritalStatus)
  MaritalStatus: MaritalStatus;
  @ForeignKey(() => MaritalStatus)
  MaritalStatusID: MaritalStatus;

  @BelongsTo(() => Lawyer)
  Lawyer: Lawyer;
  @ForeignKey(() => Lawyer)
  LawyerID: Lawyer;
}
