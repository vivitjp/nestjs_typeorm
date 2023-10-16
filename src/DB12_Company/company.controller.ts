import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DataCompanyService } from './company.service';
import { ERROR_OBJECT } from '@/constants/errors';
import { DataCompany } from './company.entity';

@Controller('company') //URL
export class DataCompanyController {
  constructor(private readonly service: DataCompanyService) {}

  //全取得
  //【GET】 curl -XGET http://localhost:3000/company/
  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】curl -X POST -H "Content-Type: application/json" -d '{"name":"AAA","city":"Osaka"}' http://localhost:3000/company/
  @Post()
  async insert(
    @Body() data: Partial<DataCompany> | Partial<DataCompany>[],
  ): Promise<boolean> {
    try {
      return await this.service.insert(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //更新
  //【PUT】curl -XPUT -H "Content-Type: application/json" -d '{"city":"Osaka2"}' http://localhost:3000/company/1
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<DataCompany>,
  ): Promise<boolean> {
    try {
      return await this.service.update(id, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //削除
  //【DELETE】: DOMAIN/company/john
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      return await this.service.delete(id);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
