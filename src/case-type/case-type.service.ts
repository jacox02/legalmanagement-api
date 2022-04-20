import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from 'src/entities/Client.model';
import { Lawyer } from 'src/entities/Lawyer.model';

import { IResponseMessage } from '../interfaces/response.interface';
import { CaseType } from 'src/entities/CaseType.model';

@Injectable()
export class CaseTypeService {
  getVehicleDataParams: object[];
  constructor(
    @InjectModel(CaseType)
    private casesModel: typeof CaseType,
  ) {
    this.getVehicleDataParams = [];
  }

  async getAll() {
    type reponse = {
      data: any;
      message: string;
    };
    let vehicles: CaseType[];

    try {
      vehicles = await this.casesModel
        .findAll({
          include: this.getVehicleDataParams,
        })
        .then((vehiclesFound: CaseType[]) => {
          return vehiclesFound;
        })
        .catch((err) => {
          return [];
        });
    } catch (error) {}

    return vehicles;
  }
  async findCaseByID(id: string) {
    const vehicle = await this.casesModel
      .findOne({
        where: { CaseID: id },
        include: this.getVehicleDataParams,
      })
      .then(async (vehicle) => {
        return vehicle;
      });

    return vehicle;
  }

  async removeOne(id: string): Promise<IResponseMessage> {
    const message: IResponseMessage = {
      code: 200,
      message: 'Caso borrado con exito',
    };

    const caso = await this.findCaseByID(id);

    if (caso != null) {
      await caso.destroy();
    } else {
      message.message = 'Este caso no existe!';
    }
    return message;
  }
  async insertVehicle(caso: CaseType) {
    const message: IResponseMessage = {
      code: 200,
      message: 'Caso anadido con exito',
    };
    console.log(caso);

    try {
      const result = await this.casesModel.create({
        TypeID: caso.TypeID,
        Type: caso.Type,
      });
    } catch (error: any) {
      message.message = error.name;
    }
    return message;
  }
  async updateVehicle(caso: CaseType) {
    const message: IResponseMessage = {
      code: 200,
      message: 'Caso actualizado con exito',
    };
    try {
      const result = await this.findCaseByID(caso.TypeID.toString());
      result.update(
        {
          TypeID: caso.TypeID,
          Type: caso.Type,
        },
        { where: { CaseID: caso.TypeID } },
      );
    } catch (error: any) {
      message.message = error.name;
    }
    return message;
  }
}
