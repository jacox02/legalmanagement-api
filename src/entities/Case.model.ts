import {
  Column,
  Model,
  BelongsTo,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Lawyer } from './Lawyer.model';
import { Client } from './Client.model';
import { CaseType } from './CaseType.model';
@Table({ modelName: 'cases', createdAt: false, updatedAt: false })
export class Case extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  CaseID: number;

  @Column
  Date: Date;

  @Column
  Status: boolean;

  @Column
  Description: string;

  // @HasMany(() => Photo, { onDelete: 'cascade' })
  // Photos: Photo[];

  @BelongsTo(() => Lawyer)
  Lawyer: Lawyer;
  @ForeignKey(() => Lawyer)
  LawyerID: Lawyer;

  @BelongsTo(() => CaseType)
  CaseType: CaseType;
  @ForeignKey(() => CaseType)
  CaseTypeID: CaseType;

  @BelongsTo(() => Client)
  Client: Client;
  @ForeignKey(() => Client)
  ClientID: Client;
}
