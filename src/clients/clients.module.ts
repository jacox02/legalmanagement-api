import { Module } from '@nestjs/common';

import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/entities/Client.model';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
