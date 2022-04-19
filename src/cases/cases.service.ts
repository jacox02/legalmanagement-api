import { Injectable } from '@nestjs/common';
import { Case } from '../entities/Case.model';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from 'src/entities/Client.model';
import { Lawyer } from 'src/entities/Lawyer.model';

import { IResponseMessage } from '../interfaces/response.interface';

@Injectable()
export class CasesService {
  getVehicleDataParams: object[];
  constructor(
    @InjectModel(Case)
    private casesModel: typeof Case,
  ) {
    this.getVehicleDataParams = [
      {
        model: Lawyer,
        required: true,
        attributes: ['LawyerID', 'FullName'],
      },
      {
        model: Client,
        required: true,
        attributes: ['ClientID', 'Firstname', 'Lastname'],
      },
    ];
  }

  async getAll() {
    type reponse = {
      data: any;
      message: string;
    };
    let vehicles: Case[];

    try {
      vehicles = await this.casesModel
        .findAll({
          include: this.getVehicleDataParams,
        })
        .then((vehiclesFound: Case[]) => {
          return vehiclesFound;
        })
        .catch((err) => {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
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
  async insertVehicle(caso: Case) {
    const message: IResponseMessage = {
      code: 200,
      message: 'Caso anadido con exito',
    };
    console.log(caso);

    try {
      const result = await this.casesModel.create({
        CaseID: caso.CaseID,
        Date: caso.Date,
        Status: caso.Status,
        Description: caso.Description,
        ClientID: caso.Client,
        LawyerID: caso.Lawyer,
      });
    } catch (error: any) {
      message.message = error.name;
    }
    return message;
  }
  async updateVehicle(caso: Case) {
    const message: IResponseMessage = {
      code: 200,
      message: 'Caso actualizado con exito',
    };
    try {
      const result = await this.findCaseByID(caso.CaseID.toString());
      result.update(
        {
          CaseID: caso.CaseID,
          Date: caso.Date,
          Status: caso.Status,
          Description: caso.Description,
          ClientID: caso.ClientID,
          LawyerID: caso.LawyerID,
        },
        { where: { CaseID: caso.CaseID } },
      );
    } catch (error: any) {
      message.message = error.name;
    }
    return message;
  }
}
