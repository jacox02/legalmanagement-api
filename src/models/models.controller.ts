import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ModelsService } from './models.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VehicleModel } from 'src/entities/VehicleModels.model';

@ApiTags('Models')
@Controller()
export class ModelsController {
  constructor(private readonly modelService: ModelsService) {}

  @Get('/get/all')
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VehicleModel,
    isArray: true,
  })
  @HttpCode(200)
  async getAll(): Promise<any> {
    const data = await this.modelService.getAll();
    return data;
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VehicleModel,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async createVehicle(@Body() vehicle): Promise<any> {
    return this.modelService.insertVehicle(vehicle);
  }

  @Get('/get/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VehicleModel,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async getVehicle(@Param('id') id: string): Promise<any> {
    return this.modelService.findModelById(id);
  }

  @Post('/remove/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VehicleModel,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async removeVehicle(@Param('id') id: string): Promise<any> {
    return this.modelService.removeOne(id);
  }

  @Get('/get/brand/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: VehicleModel,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async getModelsByBrand(@Param('id') id: string): Promise<any> {
    return this.modelService.getModelsByBrand(id);
  }
}
