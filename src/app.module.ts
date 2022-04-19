import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: '5GES85RJFFULX',
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
    CasesModule,
    RouterModule.register([
      { path: 'lawyers', module: LawyersModule },
      { path: 'clients', module: ClientsModule },
      { path: 'cases', module: CasesModule },
      { path: '', module: AppModule },
    ]),
  ],
})
export class AppModule {}
