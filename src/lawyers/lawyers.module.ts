import { Module } from '@nestjs/common';

import { BrandsService } from './lawyers.service';
import { BrandsController } from './lawyers.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Lawyer } from 'src/entities/Lawyer.model';

@Module({
  imports: [SequelizeModule.forFeature([Lawyer])],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class LawyersModule {}
