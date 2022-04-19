import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from 'src/entities/Client.model';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable()
export class ClientsService {
  getVehicleDataParams: object[];

  constructor(
    @InjectModel(Client)
    private modelsModel: typeof Client,
  ) {
    //NOTE: DEFINE this.getVehicleDataParams with the data we want to query from model model example at Vehicle.service.ts
  }

  async getAll() {
    const vehicles = await this.modelsModel.findAll({
      include: this.getVehicleDataParams,
    });

    return vehicles;
  }
  async findClientById(id: string) {
    const clientFound = await this.modelsModel
      .findOne({
        where: { ClientID: id },
        include: this.getVehicleDataParams,
      })
      .then(async (clientFound) => {
        return clientFound;
      });

    return clientFound;
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
    const model = await this.findClientById(id);
    const message: IResponseMessage = {
      code: 403,
      message: 'Cliente borrado con exito',
    };
    if (model != null) {
      await model.destroy();
    } else {
      message.message = 'Este cliente no existe!';
    }
    return message;
  }
  async insertVehicle(model: Client) {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'Model successfully added',
      };
      const result = await this.modelsModel.create({
        ModelID: 0,
        Firstname: model.Firstname.toUpperCase(),
        Lastname: model.Lastname,
        BrandID: model.LawyerID,
      });

      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
