import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/Vehicles.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle)
    private vehicleModel: typeof Vehicle,
  ) {}

  async getAll() {
    return this.vehicleModel.findAll();
  }
  async findVehicleBy(id: string) {
    return this.vehicleModel.findOne({ where: { id } });
  }
  async removeOne(id: string) {
    const vehicle = await this.findVehicleBy(id);
    await vehicle.destroy();
  }
}
