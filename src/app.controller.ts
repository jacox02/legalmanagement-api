import {
  Controller,
  Request,
  Post,
  Response,
  HttpCode,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/main')
  async Main(
    @Response() response: Response,
    @Request() request: Request,
  ): Promise<any> {
    let result = this.appService.data();
    return result;
  }
}
