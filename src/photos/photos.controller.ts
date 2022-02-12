import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Photo } from 'src/entities/Photo.model';

@ApiTags('Photos')
@Controller()
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('/get/all')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Photo,
    isArray: true,
  })
  @HttpCode(200)
  async getAll(): Promise<any> {
    const data = await this.photosService.getAll();
    return data;
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Photo,
  })
  @HttpCode(200)
  async createVehicle(@Body() photo): Promise<any> {
    const vehicleID = 1;
    return this.photosService.insertPhoto(photo, vehicleID);
  }

  @Get('/get/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Photo,
  })
  @HttpCode(200)
  async getVehicle(@Param('id') id: string): Promise<any> {
    return this.photosService.findPhotoBy(id);
  }

  @Post('/remove/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Photo,
  })
  @HttpCode(200)
  async removeVehicle(@Param('id') id: string): Promise<any> {
    return this.photosService.removeOne(id);
  }
}
