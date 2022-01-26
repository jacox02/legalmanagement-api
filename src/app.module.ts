import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './entities/Users.model';
import { Vehicle } from './entities/Vehicles.model';
import { Brand } from './entities/VehicleBrands.model';
import { VehicleModel } from './entities/VehicleModels.model';
import { VehicleTypes } from './entities/VehicleTypes.model';
import { ScheduledMeet } from './entities/ScheduledMeets.model';
import { Photo } from './entities/Photo.model';

import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';
import { VehicleTypesModule } from './vehicletypes/vehicletypes.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    UsersModule,
    VehiclesModule,
    PhotosModule,
    AuthModule,
    BrandsModule,
    ModelsModule,
    VehicleTypesModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '5GES85RJFFULX',
      autoLoadModels: true,
      port: 3306,
      synchronize: true,
      // sync: {
      //   force: true,
      // },
      logQueryParameters: false,
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
    RouterModule.register([{ path: 'photos', module: PhotosModule }]),
    RouterModule.register([{ path: 'brands', module: BrandsModule }]),
    RouterModule.register([{ path: 'models', module: ModelsModule }]),
    RouterModule.register([
      { path: 'vehicletypes', module: VehicleTypesModule },
    ]),
  ],
})
export class AppModule {}
