import { Module } from '@nestjs/common';

import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from 'src/entities/Photo.model';

@Module({
  imports: [SequelizeModule.forFeature([Photo])],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
