import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './entities/Users.entity';
import { Vehicle } from './entities/Vehicles.entity';
import { Brand } from './entities/VehicleBrands.entity';
import { VehicleModel } from './entities/VehicleModels.entity';
import { VehicleTypes } from './entities/VehicleTypes.entity';
import { ScheduledMeet } from './entities/ScheduledMeets.entity';
import { Photo } from './entities/Photo.entity';
@Module({
  imports: [
    UsersModule,
    VehiclesModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '5GES85RJFFULX',
      autoLoadModels: true,
      synchronize: true,
      database: 'blackoutdatabase',
      models: [
        User,
        Vehicle,
        Brand,
        VehicleModel,
        VehicleTypes,
        ScheduledMeet,
        Photo,
      ],
    }),
    RouterModule.register([{ path: 'users', module: UsersModule }]),
    RouterModule.register([{ path: 'vehicles', module: VehiclesModule }]),
  ],
  controllers: [AppController, UsersController, VehiclesController],
})
export class AppModule {}
