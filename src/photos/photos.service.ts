import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from 'src/entities/Photo.model';
import { IResponseMessage } from '../interfaces/response.interface';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo)
    private photoModel: typeof Photo, // private photoModel: typeof Photo,
  ) {}

  async getAll() {
    return await this.photoModel.findAll();
  }
  async findPhotoBy(id: string | number) {
    const photo = await this.photoModel.findOne({ where: { VehicleID: id } });
    return photo;
  }
  async findMultiplePhotos(id: string | number) {
    // const photos =
    return await this.photoModel.findAll({ where: { VehicleID: id } });
  }
  async removeOne(id: string): Promise<IResponseMessage> {
    const photo = await this.findPhotoBy(id);
    const message: IResponseMessage = {
      code: 200,
      message: 'Photo successfully removed',
    };

    photo.destroy();

    return message;
  }
  async insertPhoto(photo: Photo, vehicleID: number) {
    try {
      const message: IResponseMessage = {
        code: 200,
        message: 'Photo successfully added',
      };
      console.log(photo);

      await this.photoModel.create({
        PhotoID: 0,
        PhotoUri: photo.PhotoUri,
        VehicleID: vehicleID,
      });

      return message;
    } catch (error) {
      console.log(error);
    }
  }
}