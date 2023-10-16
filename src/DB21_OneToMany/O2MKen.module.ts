import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { O2MKenController } from './O2MKen.controller';
import { O2MKenService } from './O2MKen.service';
import { O2MKen } from './O2MKen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([O2MKen])],
  exports: [TypeOrmModule],
  providers: [O2MKenService],
  controllers: [O2MKenController],
})
export class O2MKenModule {}
