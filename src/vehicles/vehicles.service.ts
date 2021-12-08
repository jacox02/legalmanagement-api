import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/Vehicles.entity';
import { Connection } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(private connection: Connection) {}
  async createMany(vehicles: Vehicle[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await vehicles.map(async (vehicle) => {
        await queryRunner.manager.save(vehicle);
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async insertVehicle(vehicle: Vehicle) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(vehicle);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async getAll(): Promise<Vehicle[]> {
    let userList: Vehicle[];
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      userList = await queryRunner.manager.find(Vehicle);
      await queryRunner.commitTransaction();
      return userList;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<Vehicle> {
    let vehicle: Vehicle;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      vehicle = await queryRunner.manager.findOne(id);
      await queryRunner.commitTransaction();
      console.log(vehicle);
      return vehicle;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
