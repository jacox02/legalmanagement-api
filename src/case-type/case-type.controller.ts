import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CaseTypeService } from './case-type.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Case } from 'src/entities/Case.model';

@ApiTags('CaseType')
@Controller()
export class CaseTypeController {
  constructor(private readonly casesTypeService: CaseTypeService) {}

  @Get('/get/all')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Case,
    isArray: true,
  })
  @HttpCode(200)
  async getAll(@Param() params): Promise<any> {
    const data = await this.casesTypeService.getAll();
    return data;
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Case,
  })
  @HttpCode(200)
  async createCase(@Body() caseToSave): Promise<any> {
    let savedCase = await this.casesTypeService.insertVehicle(caseToSave);
    return savedCase;
  }

  @Get('/get/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Case,
  })
  @HttpCode(200)
  async getVehicle(@Param('id') id: string): Promise<any> {
    let data = this.casesTypeService.findCaseByID(id);
    return data;
  }

  @Get('/remove/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Case,
  })
  @HttpCode(200)
  async removeVehicle(@Param('id') id: string): Promise<any> {
    return this.casesTypeService.removeOne(id);
  }
}
