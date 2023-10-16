import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { M2OController } from './M2OCity.controller';
import { M2OCityService } from './M2OCity.service';
import { M2OCity } from './M2OCity.entity';
import { O2MKen } from '../DB21_OneToMany/O2MKen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([M2OCity, O2MKen])],
  exports: [TypeOrmModule],
  providers: [M2OCityService],
  controllers: [M2OController],
})
export class M2OCityModule {}
