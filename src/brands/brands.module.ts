import { Module } from '@nestjs/common';

import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from 'src/entities/VehicleBrands.model';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
