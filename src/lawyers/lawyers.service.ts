import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lawyer } from 'src/entities/Lawyer.model';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable()
export class LawyersService {
  getLawyersDataParams: object[];

  constructor(
    @InjectModel(Lawyer)
    private lawyerModel: typeof Lawyer,
  ) {
    //NOTE: DEFINE this.getVehicleDataParams with the data we want to query from brand model example at Vehicle.service.ts
  }

  async getAll() {
    const vehicles = await this.lawyerModel.findAll({
      include: this.getLawyersDataParams,
    });

    return vehicles;
  }
  async findLawyerById(id: string) {
    const vehicle = await this.lawyerModel
      .findOne({
        where: { LawyerID: id },
      })
      .then(async (vehicle) => {
        return vehicle;
      });

    return vehicle;
  }

  async insertLawyer(lawyer: Lawyer) {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'Brand successfully added',
      };
      const result = await this.lawyerModel.create({
        LawyerID: 0,
        FullName: lawyer.FullName,
        Speciality: lawyer.Speciality,
      });

      return message;
    } catch (error) {
      console.log(error);
    }
  }

  async removeOne(id: string): Promise<IResponseMessage> {
    const message: IResponseMessage = {
      code: 403,
      message: 'Lawyer successfully removed',
    };

    const brand = await this.findLawyerById(id);

    if (brand != null) {
      await brand.destroy();
    } else {
      message.message = 'Este caso no existe!';
    }
    return message;
  }

  async updateLawyer(lawyer: Lawyer) {
    const message: IResponseMessage = {
      code: 200,
      message: 'Abogado actualizado con exito',
    };

    try {
      let lawyerId: number = parseInt(lawyer.LawyerID.toString());

      Lawyer.findOne({ where: { LawyerID: lawyerId } })
        .then((record) => {
          if (!record) {
            message.message = 'No record found';
          }

          record.update(lawyer).then(() => {
            message.message = 'Abogado actualizado!';
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
}
