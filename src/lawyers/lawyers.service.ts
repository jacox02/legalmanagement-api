import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lawyer } from 'src/entities/Lawyer.model';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable()
export class BrandsService {
  getVehicleDataParams: object[];

  constructor(
    @InjectModel(Lawyer)
    private lawyerModel: typeof Lawyer,
  ) {
    //NOTE: DEFINE this.getVehicleDataParams with the data we want to query from brand model example at Vehicle.service.ts
  }

  async getAll() {
    const vehicles = await this.lawyerModel.findAll({
      include: this.getVehicleDataParams,
    });

    return vehicles;
  }
  async findLawyerById(id: string) {
    const vehicle = await this.lawyerModel
      .findOne({
        where: { BrandID: id },
        include: this.getVehicleDataParams,
      })
      .then(async (vehicle) => {
        return vehicle;
      });

    return vehicle;
  }
  async removeOne(id: string): Promise<IResponseMessage> {
    const brand = await this.findLawyerById(id);
    const message: IResponseMessage = {
      code: 403,
      message: 'Lawyer successfully removed',
    };
    if (brand != null) {
      await brand.destroy();
    } else {
      message.message = 'This lawyer does not exist!';
    }
    return message;
  }
  async insertLawyer(lawyer: Lawyer) {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'Brand successfully added',
      };
      const result = await this.lawyerModel.create({
        LawyerID: 0,
        LawyerFullName: lawyer.FullName,
      });

      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
