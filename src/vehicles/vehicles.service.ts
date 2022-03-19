import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/Vehicles.model';
import { InjectModel } from '@nestjs/sequelize';
import { VehicleModel } from 'src/entities/VehicleModels.model';
import { Brand } from 'src/entities/VehicleBrands.model';
import { VehicleTypes } from 'src/entities/VehicleTypes.model';

import { IResponseMessage } from '../interfaces/response.interface';
import { PhotosService } from 'src/photos/photos.service';
import { Photo } from 'src/entities/Photo.model';
import { FilesService } from 'src/aws/s3.controller';
import { QueryError } from 'mysql2';

@Injectable()
export class VehiclesService {
  photoService: PhotosService;
  getVehicleDataParams: object[];
  filesService: FilesService;
  constructor(
    @InjectModel(Vehicle)
    private vehicleModel: typeof Vehicle,
  ) {
    this.photoService = new PhotosService(Photo);
    this.getVehicleDataParams = [
      {
        model: Brand,
        required: true,
        attributes: ['BrandName'],
      },
      {
        model: VehicleModel,
        required: true,
        attributes: ['ModelName'],
      },
      {
        model: VehicleTypes,
        required: true,
      },
      {
        model: Photo,
        required: true,
      },
    ];
  }

  async getAll() {
    const vehicles = await this.vehicleModel.findAll({
      include: this.getVehicleDataParams,
    });

    return vehicles;
  }
  async findVehicleBy(id: string) {
    const vehicle = await this.vehicleModel
      .findOne({
        where: { VehicleID: id },
        include: this.getVehicleDataParams,
      })
      .then(async (vehicle) => {
        if (vehicle) {
          vehicle.Photos = await this.photoService.findMultiplePhotos(id);
        } else {
          vehicle.Photos = [];
        }
        return vehicle;
      });

    return vehicle;
  }
  async findVehicleByCategory(categoryID: string) {
    try {
      let foundVehicles: Vehicle[] = [];

      if (categoryID != '2') {
        await this.vehicleModel
          .findAll({
            where: { TypeID: categoryID },
            include: this.getVehicleDataParams,
          })
          .then((data) => {
            foundVehicles = data;
          })
          .catch((err) => {
            return {};
          });
      } else {
        await this.vehicleModel
          .findAll({
            where: { TypeID: categoryID, VehicleOnRent: '0' },
            include: this.getVehicleDataParams,
          })
          .then((data) => {
            console.log(data);
            foundVehicles = data;
          })
          .catch((err) => {
            console.log(err);
            return {};
          });
      }
      //TODO: Fix the Photos model que esta haciendoq ue ciertos vehiculos no aparezcan por el tipo de dato que  tiene
      return foundVehicles;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  async removeOne(id: string): Promise<IResponseMessage> {
    const vehicle = await this.findVehicleBy(id);
    const message: IResponseMessage = {
      code: 200,
      message: 'Vehicle successfully removed',
    };
    if (vehicle != null) {
      await vehicle.destroy();
    } else {
      message.message = 'This vehicle does not exist!';
    }
    return message;
  }
  async insertVehicle(vehicle: Vehicle) {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'Vehicle successfully added',
      };

      let vehicleIdentifier = `BK-${vehicle.VIN.slice(vehicle.VIN.length - 6)}`;

      this.filesService
        .uploadPublicFile(vehicle.Photos, `${vehicleIdentifier}`)
        .then((result) => {
          console.log(result);
        });

      const result = await this.vehicleModel.create({
        VehicleID: vehicle.VehicleID,
        VehicleYear: vehicle.VehicleYear,
        VehiclePrice: vehicle.VehiclePrice,
        VehicleOnRent: vehicle.VehicleOnRent,
        VehicleDescription: vehicle.VehicleDescription,
        TypeID: vehicle.TypeID,
        BrandID: vehicle.BrandID,
        ModelID: vehicle.ModelID,
        Photos: vehicle.Photos,
        VIN: vehicle.VIN,
        Identifier: vehicleIdentifier,
      });

      vehicle.Photos.map(async (photo) => {
        await this.photoService.insertPhoto(photo, result.VehicleID);
      });

      return message;
    } catch (error) {
      let err: QueryError;
      err = error;
      console.log({ a: err });
    }
  }
}
