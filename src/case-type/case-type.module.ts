import { Module } from '@nestjs/common';

import { CaseTypeService } from './case-type.service';
import { CaseTypeController } from './case-type.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { CaseType } from 'src/entities/CaseType.model';

@Module({
  imports: [SequelizeModule.forFeature([CaseType])],
  providers: [CaseTypeService],
  controllers: [CaseTypeController],
})
export class CaseTypeModule {}
