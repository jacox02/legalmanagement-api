import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VehicleTypes } from 'src/entities/VehicleTypes.model';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable()
export class VehicleTypesService {
  getVehicleDataParams: object[];
  //TODO: Modify ALL to a vehicle Type MODE

  constructor(
    @InjectModel(VehicleTypes)
    private modelsModel: typeof VehicleTypes,
  ) {
    //NOTE: DEFINE this.getVehicleDataParams with the data we want to query from model model example at Vehicle.service.ts
  }

  async getAll() {
    const vehicles = await this.modelsModel.findAll({
      include: this.getVehicleDataParams,
    });

    return vehicles;
  }
  async findModelById(id: string) {
    //TODO: Modify this to a vehicle Type SEARCH

    const vehicle = await this.modelsModel
      .findOne({
        where: { BrandID: id },
        include: this.getVehicleDataParams,
      })
      .then(async (vehicle) => {
        return vehicle;
      });

    return vehicle;
  }
  async getModelsByBrand(id: string) {
    //TODO: Modify this to a vehicle Type SEARCH

    const vehicle = await this.modelsModel
      .findAll({
        where: { BrandID: id },
        include: this.getVehicleDataParams,
      })
      .then(async (vehicle) => {
        return vehicle;
      });

    return vehicle;
  }
  async removeOne(id: string): Promise<IResponseMessage> {
    const model = await this.findModelById(id);
    const message: IResponseMessage = {
      code: 403,
      message: 'model successfully removed',
    };
    if (model != null) {
      await model.destroy();
    } else {
      message.message = 'This model does not exist!';
    }
    return message;
  }
  async insertVehicle(model: VehicleTypes) {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'Model successfully added',
      };
      //TODO: Modify this to add vehicle Type
      // const result = await this.modelsModel.create({
      //   ModelID: 0,
      //   ModelCode: model.ModelName.toUpperCase(),
      //   ModelName: model.ModelName,
      //   BrandID: model.BrandID,
      // });

      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
