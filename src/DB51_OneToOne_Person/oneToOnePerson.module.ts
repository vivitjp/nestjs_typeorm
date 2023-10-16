import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { O2O_PersonService } from './oneToOnePerson.service';
import { O2O_PersonController } from './oneToOnePerson.controller';
import { O2O_Person } from './oneToOnePerson.entity';
import { O2O_Profile } from '../DB52_OneToOne_Profile/oneToOneProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([O2O_Person, O2O_Profile])],
  exports: [TypeOrmModule],
  providers: [O2O_PersonService],
  controllers: [O2O_PersonController],
})
export class O2O_PersonModule {}
