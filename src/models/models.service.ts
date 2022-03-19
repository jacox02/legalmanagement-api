import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VehicleModel } from 'src/entities/VehicleModels.model';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable()
export class ModelsService {
  getVehicleDataParams: object[];

  constructor(
    @InjectModel(VehicleModel)
    private modelsModel: typeof VehicleModel,
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
    const vehicle = await this.modelsModel.findOne().then(async (vehicle) => {
      return vehicle;
    });

    return vehicle;
  }
  async getModelsByBrand(id: string) {
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
  async insertVehicle(model: VehicleModel) {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'Model successfully added',
      };
      const result = await this.modelsModel.create({
        ModelID: 0,
        ModelCode: model.ModelName.toUpperCase(),
        ModelName: model.ModelName,
        BrandID: model.BrandID,
      });

      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
