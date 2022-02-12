import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/Users.model';
import { IResponseMessage } from 'src/interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
  async createOne(user: User): Promise<IResponseMessage> {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'User successfully added',
      };
      const result = await this.userModel
        .create({
          UserID: user.UserID,
          FirstName: user.FirstName,
          Password: user.Password,
          MainEmail: user.MainEmail,
          RecoveryEmail: user.RecoveryEmail,
          LastName: user.LastName,
          IsActive: user.IsActive,
        })
        .then((result: User) => {
          console.log(result);
        });
      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
