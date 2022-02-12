import { Module } from '@nestjs/common';

import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { VehicleModel } from 'src/entities/VehicleModels.model';

@Module({
  imports: [SequelizeModule.forFeature([VehicleModel])],
  providers: [ModelsService],
  controllers: [ModelsController],
})
export class ModelsModule {}
