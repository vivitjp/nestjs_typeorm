import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataGeneralService } from './general.service';
import { DataGeneralController } from './general.controller';
import { DataGeneral } from './general.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataGeneral])],
  exports: [TypeOrmModule],
  providers: [DataGeneralService],
  controllers: [DataGeneralController],
})
export class DataGeneralModule {}
