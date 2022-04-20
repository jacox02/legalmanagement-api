import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Client } from 'src/entities/Client.model';

@ApiTags('Models')
@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/get/all')
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Client,
    isArray: true,
  })
  @HttpCode(200)
  async getAll(): Promise<any> {
    const data = await this.clientsService.getAll();
    return data;
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Client,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async createVehicle(@Body() vehicle): Promise<any> {
    return this.clientsService.insertVehicle(vehicle);
  }

  @Get('/get/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Client,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async getVehicle(@Param('id') id: string): Promise<any> {
    return this.clientsService.findClientById(id);
  }

  @Get('/remove/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Client,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async removeVehicle(@Param('id') id: string): Promise<any> {
    return this.clientsService.removeOne(id);
  }

  @Post('/update')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Client,
  })
  @ApiOperation({ summary: 'Create cat' })
  @HttpCode(200)
  async updateClient(@Body() caseToUpdate): Promise<any> {
    let data = this.clientsService.updateClient(caseToUpdate);
    return data;
  }
}
