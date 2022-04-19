import { Module } from '@nestjs/common';

import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Case } from 'src/entities/Case.model';

@Module({
  imports: [SequelizeModule.forFeature([Case])],
  providers: [CasesService],
  controllers: [CasesController],
})
export class CasesModule {}
