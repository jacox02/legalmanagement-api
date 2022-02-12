import { Module } from '@nestjs/common';

import { VehicleTypesService } from './vehicletypes.service';
import { VehicleTypesController } from './vehicletypes.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { VehicleTypes } from 'src/entities/VehicleTypes.model';

@Module({
  imports: [SequelizeModule.forFeature([VehicleTypes])],
  providers: [VehicleTypesService],
  controllers: [VehicleTypesController],
})
export class VehicleTypesModule {}
