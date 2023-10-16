import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataM2MController } from './manyToMany.controller';
import { DataM2MService } from './manyToMany.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataM2MService])],
  exports: [TypeOrmModule],
  providers: [DataM2MService],
  controllers: [DataM2MController],
})
export class M2MModule {}
