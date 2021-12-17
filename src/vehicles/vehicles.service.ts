import { Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/Vehicles.entity';
import { Connection, getConnection, getRepository } from 'typeorm';
import { User } from 'src/entities/Users.entity';

@Injectable()
export class VehiclesService {
  constructor(private connection: Connection) {}
  async createMany(vehicles: Vehicle[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await vehicles.map(async (vehicle) => {
        console.log(vehicle.VehicleDescription);
        let Car: Vehicle = new Vehicle();
        Car.VehicleBrandID = vehicle.VehicleBrandID;
        Car.VehicleID = vehicle.VehicleID;
        Car.VehicleBrandID = vehicle.VehicleBrandID;
        Car.VehicleModelID = vehicle.VehicleModelID;
        Car.VehicleTypeID = vehicle.VehicleTypeID;
        Car.VehicleYear = vehicle.VehicleYear;
        Car.VehiclePrice = vehicle.VehiclePrice;
        Car.VehicleOnRent = vehicle.VehicleOnRent;
        Car.VehicleDescription = vehicle.VehicleDescription;
        console.log(await (await queryRunner.manager.save(Car)).VehicleID);
      });
      await queryRunner.commitTransaction();
      // await queryRunner.release();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      // console.log('Vehicles saved, releasing transaction');
    }
  }
  async insertVehicle(vehicle: Vehicle) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let Car: Vehicle = new Vehicle();
      Car.VehicleBrandID = vehicle.VehicleBrandID;
      Car.VehicleID = vehicle.VehicleID;
      Car.VehicleBrandID = vehicle.VehicleBrandID;
      Car.VehicleModelID = vehicle.VehicleModelID;
      Car.VehicleTypeID = vehicle.VehicleTypeID;
      Car.VehicleYear = vehicle.VehicleYear;
      Car.VehiclePrice = vehicle.VehiclePrice;
      Car.VehicleOnRent = vehicle.VehicleOnRent;
      Car.VehicleDescription = vehicle.VehicleDescription;

      await queryRunner.manager.save(Car);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      return {
        message:
          'Ocurrio un error, reintentelo mas tarde, si el problema persiste, porfavor contactar a soporte!',
        error: err,
      };
    } finally {
      await queryRunner.release();
      return {
        message: 'Saved Vehicle!',
      };
    }
  }
  async findVehicleBy(searchParams) {
    try {
      const users = await getConnection()
        .createQueryBuilder(Vehicle, 'vehicle')
        .where('user.VehicleYear = :isAdmin', { isAdmin: true })
        .cache(true)
        .getMany();
    } catch (err) {
      console.log(err);
      return {
        message:
          'Ocurrio un error, reintentelo mas tarde, si el problema persiste, porfavor contactar a soporte!',
        error: err,
      };
    } finally {
      return {
        message: 'Saved Vehicle!',
      };
    }
  }
  async getAll(): Promise<Vehicle[]> {
    let vehicleList: Vehicle[];
    // const queryRunner = this.connection.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   vehicleList = await queryRunner.manager.find(Vehicle);
    //   await queryRunner.commitTransaction();
    //   return vehicleList;
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }
    try {
      const userRepository = getRepository(Vehicle); // you can also get it via getConnection().getRepository() or getManager().getRepository()
      vehicleList = await userRepository.find({
        select: ['VehicleID'],
        relations: ['vehicle_brands'],
      });
      return vehicleList;
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(id: string): Promise<Vehicle> {
    let vehicle: Vehicle;
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      vehicle = await queryRunner.manager.findOne(Vehicle, id);
      await queryRunner.commitTransaction();
      return vehicle;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
