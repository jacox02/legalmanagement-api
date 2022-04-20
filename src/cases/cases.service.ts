import { Injectable } from '@nestjs/common';
import { Case } from '../entities/Case.model';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from 'src/entities/Client.model';
import { Lawyer } from 'src/entities/Lawyer.model';

import { IResponseMessage } from '../interfaces/response.interface';
import { CaseType } from 'src/entities/CaseType.model';

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
      {
        model: CaseType,
        required: true,
        attributes: ['TypeID', 'Type'],
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
  async insertCase(caso: Case) {
    const message: IResponseMessage = {
      code: 200,
      message: 'Caso anadido con exito',
    };

    try {
      const result = await this.casesModel.create({
        CaseID: caso.CaseID,
        Date: caso.Date,
        Status: caso.Status,
        Description: caso.Description,
        CaseTypeID: caso.CaseTypeID,
        ClientID: caso.Client,
        LawyerID: caso.Lawyer,
      });
    } catch (error: any) {
      message.message = error.name;
    }
    return message;
  }
  async updateCase(caso: Case) {
    const message: IResponseMessage = {
      code: 200,
      message: 'Caso actualizado con exito',
    };

    try {
      let recordId: number = parseInt(caso.CaseID.toString());

      Case.findOne({ where: { CaseID: recordId } })
        .then((record) => {
          if (!record) {
            message.message = 'No record found';
          }

          record.update(caso).then(() => {
            message.message = 'Caso actualizado!';
          });
        })
        .catch((error) => {
          message.message = error;
        });
    } catch (error: any) {
      message.message = error.name;
    }
    return message;
  }
  async filterCases(filters: any) {
    type reponse = {
      data: any;
      message: string;
    };
    let vehicles: Case[];

    console.log('====================================');
    console.log(filters);
    console.log('====================================');
    try {
      let whereObject = {
        LawyerID: filters.Lawyer,
        ClientID: filters.Client,
        Status: filters.Status,
        CaseTypeID: filters.CaseType,
      };

      Object.keys(whereObject).forEach((key) => {
        if (whereObject[key] === 0) {
          delete whereObject[key];
        }
      });

      vehicles = await this.casesModel
        .findAll({
          include: this.getVehicleDataParams,
          where: whereObject,
        })
        .then((vehiclesFound: Case[]) => {
          return vehiclesFound;
        })
        .catch((err) => {
          return [];
        });
    } catch (error) {}

    return vehicles;
  }
}
