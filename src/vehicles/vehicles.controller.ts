import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller()
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Get('/get/all')
  @HttpCode(200)
  async getAll(@Param() params): Promise<any> {
    const data = await this.vehicleService.getAll();
    return data;
  }

  @Post('/create')
  @HttpCode(200)
  async createVehicle(@Param() params, @Body() vehicle): Promise<any> {
    // return this.vehicleService.insertVehicle(vehicle);
  }

  @Post('/createmany')
  @HttpCode(200)
  async createVehicleFromArray(@Param() params, @Body() vehicle): Promise<any> {
    // return this.vehicleService.createMany(vehicle);
  }

  @Get('/get/:id')
  async getVehicle(@Param('id') id: string) {
    return this.vehicleService.findVehicleBy(id);
  }
}
