import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { LawyersService } from './lawyers.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Lawyer } from 'src/entities/Lawyer.model';

@ApiTags('Lawyers')
@Controller()
export class LawyersController {
  constructor(private readonly lawyersService: LawyersService) {}

  @Get('/get/all')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Lawyer,
    isArray: true,
  })
  @HttpCode(200)
  async getAll(): Promise<any> {
    const data = await this.lawyersService.getAll();
    return data;
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Lawyer,
  })
  @HttpCode(200)
  async createVehicle(@Body() lawyer): Promise<any> {
    return this.lawyersService.insertLawyer(lawyer);
  }

  @Get('/get/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Lawyer,
  })
  @HttpCode(200)
  async getVehicle(@Param('id') id: string): Promise<any> {
    return this.lawyersService.findLawyerById(id);
  }

  @Post('/update')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Lawyer,
  })
  @HttpCode(200)
  async updateVehicle(@Body() caseToUpdate): Promise<any> {
    let data = this.lawyersService.updateLawyer(caseToUpdate);
    return data;
  }

  @Get('/remove/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Lawyer,
  })
  @HttpCode(200)
  async removeVehicle(@Param('id') id: string): Promise<any> {
    return this.lawyersService.removeOne(id);
  }
}
