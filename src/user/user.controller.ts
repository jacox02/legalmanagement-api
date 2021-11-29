import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../entities/Users.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(200)
  async getHello(@Param() params): Promise<any> {
    console.log(params);
    let data = await this.userService.getAll();
    console.log(data);

    return data;
  }

  @Post('/create')
  @HttpCode(200)
  async createUser(@Param() params): Promise<any> {
    await this.userService.insertOne();
    return '';
  }
}
