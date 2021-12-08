import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../entities/Vehicles.entity';

@Controller()
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Get()
  @HttpCode(200)
  async getHello(@Param() params): Promise<any> {
    console.log(params);
    let data = 'Hello';
    return data;
  }

  @Get('/get/all')
  @HttpCode(200)
  async getAll(@Param() params): Promise<any> {
    let data = await this.vehicleService.getAll();
    return data;
  }

  @Post('/create')
  @HttpCode(200)
  async createUser(@Param() params, @Body() vehicle): Promise<any> {
    return this.vehicleService.insertVehicle(vehicle);
  }

  @Get('/get/:id')
  async getVehicle(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }
}
