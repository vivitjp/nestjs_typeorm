import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { O2MKenService } from './O2MKen.service';
import { O2MKenRequest } from './dto/O2MKen.request.entity';
import { ERROR_OBJECT } from '@/constants/errors';

@Controller('o2m_ken')
export class O2MKenController {
  constructor(private readonly service: O2MKenService) {}

  //全取得
  //【GET】: http://localhost:3000/o2m_ken/
  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】: http://localhost:3000/o2m_ken/
  //*postman引数 "Body:raw:json" {"id":10,"name":"Tokyo"}
  @Post()
  async insert(@Body() data: O2MKenRequest): Promise<boolean> {
    try {
      return await this.service.insert(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //更新
  //【PUT】curl -XPUT -H "Content-Type: application/json" -d '{"id":10}' http://localhost:3000/o2m_ken/10
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: O2MKenRequest,
  ): Promise<boolean> {
    try {
      return await this.service.update(id, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //削除
  //【DELETE】curl -XDELETE http://localhost:3000/o2m_ken/10
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      return await this.service.delete(id);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
