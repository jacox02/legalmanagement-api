import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Brand } from 'src/entities/VehicleBrands.model';

@ApiTags('Brands')
@Controller()
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  @Get('/get/all')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Brand,
    isArray: true,
  })
  @HttpCode(200)
  async getAll(): Promise<any> {
    const data = await this.brandService.getAll();
    return data;
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Brand,
  })
  @HttpCode(200)
  async createVehicle(@Body() vehicle): Promise<any> {
    return this.brandService.insertVehicle(vehicle);
  }

  @Get('/get/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Brand,
  })
  @HttpCode(200)
  async getVehicle(@Param('id') id: string): Promise<any> {
    return this.brandService.findBrandById(id);
  }

  @Post('/remove/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Brand,
  })
  @HttpCode(200)
  async removeVehicle(@Param('id') id: string): Promise<any> {
    return this.brandService.removeOne(id);
  }
}
