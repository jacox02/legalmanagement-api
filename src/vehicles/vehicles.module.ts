import { Module } from '@nestjs/common';

import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from 'src/entities/Vehicles.model';

@Module({
  imports: [SequelizeModule.forFeature([Vehicle])],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
