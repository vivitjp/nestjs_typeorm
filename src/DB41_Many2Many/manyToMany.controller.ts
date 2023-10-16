import { Controller, Get, HttpException } from '@nestjs/common';
import { DataM2MService } from './manyToMany.service';
import { ERROR_OBJECT } from '@/constants/errors';

@Controller('m2m')
export class DataM2MController {
  constructor(private readonly dataM2MService: DataM2MService) {}

  //全取得
  //【GET】: http://localhost:3000/m2m/
  @Get()
  async findAll() {
    try {
      return await this.dataM2MService.findAll();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
