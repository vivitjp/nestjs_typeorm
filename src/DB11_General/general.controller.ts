import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { GeneralRequest } from './dto/general.request.entity';
import { DataGeneralService } from './general.service';
import { ERROR_OBJECT } from '@/constants/errors';

@Controller('general') //URL
export class DataGeneralController {
  constructor(private readonly service: DataGeneralService) {}

  //全取得
  //【GET】 curl -XGET http://localhost:3000/general/
  @Get()
  async findAll() {
    try {
      //return await this.service.findAll();
      return await this.service.findAll_QB();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //部分取得(引数文字列)
  //【GET】curl -XGET http://localhost:3000/general/name/john
  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    try {
      return await this.service.getByName(name);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //部分取得(引数数値)
  //【GET】curl -XGET http://localhost:3000/general/id/1
  // *文字列から数値への Built-in pipes
  @Get('id/:id')
  async findByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.service.getByID_QB(id);
      //return await this.service.getByID(id);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //JOIN
  //【GET】curl -XGET http://localhost:3000/general/join/
  @Get('join')
  async findJoin() {
    try {
      return await this.service.getAllJoined_QB();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】curl -XPOST -H "Content-Type: application/json" -d '{"name":"Bill","age":18}' http://localhost:3000/general/
  @Post()
  async insert(@Body() data: GeneralRequest): Promise<boolean> {
    try {
      return await this.service.insert1Insert(data); //配列OK
      //return await this.service.insert2Save([data]);
      //return await this.service.insert3Create([data]);  //配列NG

      //return await this.service.insert_QB(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //更新
  //【PUT】curl -XPUT -H "Content-Type: application/json" -d '{"age":28}' http://localhost:3000/general/Bill
  @Put(':name')
  async update(
    @Param('name') name: string,
    @Body() data: GeneralRequest,
  ): Promise<boolean> {
    try {
      return await this.service.update_QB(name, data);
      //return await this.service.update(name, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //挿入/更新
  //【PUT】: DOMAIN/general/ups
  //*postman引数 "Body:raw:json" {"name":"Steve","address":"Sendai"}
  @Post('ups')
  async upsert(@Body() data: GeneralRequest): Promise<boolean> {
    try {
      return await this.service.upsert_QB(data);
      //return await this.service.upsert(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //削除
  //【DELETE】: DOMAIN/general/john
  @Delete(':name')
  async delete(@Param('name') name: string): Promise<boolean> {
    try {
      return await this.service.delete_QB(name);
      //return await this.service.delete(name);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
