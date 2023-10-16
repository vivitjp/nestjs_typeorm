import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  Body,
  Param,
} from '@nestjs/common';
import { M2OCityService } from './M2OCity.service';
import { M2OCityRequest } from './dto/M2OCity.request.entity';
import { ERROR_OBJECT } from '@/constants/errors';

@Controller('m2o_city') //URL
export class M2OController {
  constructor(private readonly service: M2OCityService) {}

  //全取得
  //【GET】: http://localhost:3000/m2o_city/
  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
      //return await this.service.findAllHidden();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  @Get('join')
  async findJoin() {
    try {
      return await this.service.getAllJoinedMapByCity();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】: http://localhost:3000/m2o_city/10
  //*postman引数 "Body:raw:json" {"id":100, "name":"Shibuya"}
  @Post(':ken_id')
  async insert(
    @Param('ken_id') ken_id: number,
    @Body() data: M2OCityRequest,
  ): Promise<boolean> {
    try {
      return await this.service.insert(ken_id, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //更新
  //【PUT】curl -XPUT -H "Content-Type: application/json" -d '{"name":"Tokyo2"}' http://localhost:3000/m2o_city/100
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: M2OCityRequest,
  ): Promise<boolean> {
    try {
      return await this.service.update(id, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //削除
  //【DELETE】curl -XDELETE http://localhost:3000/m2o_city/100
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      return await this.service.delete(id);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
