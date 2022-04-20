import { Module } from '@nestjs/common';

import { LawyersService } from './lawyers.service';
import { LawyersController } from './lawyers.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Lawyer } from 'src/entities/Lawyer.model';

@Module({
  imports: [SequelizeModule.forFeature([Lawyer])],
  providers: [LawyersService],
  controllers: [LawyersController],
})
export class LawyersModule {}
