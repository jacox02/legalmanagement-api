import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../entities/Vehicles.entity';

@Controller()
export class VehiclesController {
  constructor(private readonly userService: VehiclesService) {}

  @Get()
  @HttpCode(200)
  getHello(@Param() params): Promise<any> {
    console.log(params);
    let data = this.userService.getAll();
    return data;
  }

  @Post('/create')
  @HttpCode(200)
  createUser(@Param() params): Promise<any> {
    console.log(params);
    let data = this.userService.getAll();
    return data;
  }
}
