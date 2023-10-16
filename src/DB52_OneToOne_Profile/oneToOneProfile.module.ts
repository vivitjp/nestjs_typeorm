import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { O2O_ProfileService } from './oneToOneProfile.service';
import { O2O_ProfileController } from './oneToOneProfile.controller';
import { O2O_Profile } from './oneToOneProfile.entity';
import { O2O_Person } from '../DB51_OneToOne_Person/oneToOnePerson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([O2O_Profile, O2O_Person])],
  exports: [TypeOrmModule],
  providers: [O2O_ProfileService],
  controllers: [O2O_ProfileController],
})
export class O2O_ProfileModule {}
