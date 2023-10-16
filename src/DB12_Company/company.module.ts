import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCompanyService } from './company.service';
import { DataCompanyController } from './company.controller';
import { DataCompany } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataCompany])],
  exports: [TypeOrmModule],
  providers: [DataCompanyService],
  controllers: [DataCompanyController],
})
export class CompanyModule {}
