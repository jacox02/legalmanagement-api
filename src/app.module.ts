import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { Case } from './entities/Case.model';
import { Lawyer } from './entities/Lawyer.model';
import { Client } from './entities/Client.model';

import { LawyersModule } from './lawyers/lawyers.module';
import { ClientsModule } from './clients/clients.module';
import { CasesModule } from './cases/cases.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

import configuration from './config/configuration';
import { CaseType } from './entities/CaseType.model';
import { MaritalStatus } from './entities/MaritalStatus.model';
import { CaseTypeModule } from './case-type/case-type.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'blackout-dealer-database.ck4xhi6sphki.us-east-1.rds.amazonaws.com',
      username: 'admin',
      password: 'NOno11--',
      port: 3306,
      database: 'legalmanagement',
      models: [Lawyer, Client, Case, MaritalStatus, CaseType],
      // autoLoadModels: true,
      // logQueryParameters: false,
      // logging: true,
      // synchronize: true,
      // sync: {
      //   force: true,
      // },
    }),
    LawyersModule,
    ClientsModule,
    CaseTypeModule,
    CasesModule,
    RouterModule.register([
      { path: 'lawyers', module: LawyersModule },
      { path: 'clients', module: ClientsModule },
      { path: 'cases', module: CasesModule },
      { path: 'types', module: CaseTypeModule },
      { path: '', module: AppModule },
    ]),
  ],
})
export class AppModule {}
