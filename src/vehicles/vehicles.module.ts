import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '../schemas/user.schema';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { VehiclesSubscriber } from './vehicles.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [VehiclesService, VehiclesSubscriber],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
