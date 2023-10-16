import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { O2O_SubService } from './oneToOneSub.service';
import { O2O_SubController } from './oneToOneSub.controller';
import { O2O_Sub } from './oneToOneSub.entity';
import { O2O_Main } from '../DB53_OneToOne_Main/oneToOneMain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([O2O_Sub, O2O_Main])],
  exports: [TypeOrmModule],
  providers: [O2O_SubService],
  controllers: [O2O_SubController],
})
export class O2O_SubModule {}
