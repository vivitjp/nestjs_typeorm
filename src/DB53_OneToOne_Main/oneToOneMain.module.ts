import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { O2O_MainService } from './oneToOneMain.service';
import { O2O_MainController } from './oneToOneMain.controller';
import { O2O_Main } from './oneToOneMain.entity';
import { O2O_Profile } from '../DB52_OneToOne_Profile/oneToOneProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([O2O_Main, O2O_Profile])],
  exports: [TypeOrmModule],
  providers: [O2O_MainService],
  controllers: [O2O_MainController],
})
export class O2O_MainModule {}
