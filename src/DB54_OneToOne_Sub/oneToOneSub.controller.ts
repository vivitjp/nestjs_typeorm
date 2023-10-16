import {
  Controller,
  Get,
  HttpException,
  Body,
  Delete,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { O2O_SubService } from './oneToOneSub.service';
import { ERROR_OBJECT } from '@/constants/errors';
import { O2O_SubRequest } from './dto/oneToOneSub.request.entity';
import { O2O_Sub } from './oneToOneSub.entity';

@Controller('o2o_sub') //URL
export class O2O_SubController {
  constructor(private readonly subService: O2O_SubService) {}

  //全取得
  //【GET】: http://localhost:3000/o2o_sub/
  @Get()
  async findAll() {
    try {
      return await this.subService.findAll_QB();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //部分取得(引数数値)
  //【GET】curl -XGET http://localhost:3000/o2o_sub/1
  // *文字列から数値への Built-in pipes
  @Get('id/:id')
  async findByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.subService.getByID_QB(id);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //全取得(Joined)
  //【GET】: http://localhost:3000/o2o_sub/joined/
  @Get('/joined')
  async findAllJoined() {
    try {
      return await this.subService.getAllJoined();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】curl -XPOST -H "Content-Type: application/json" -d '{"photo":"234vcs"}' http://localhost:3000/o2o_sub/3
  @Post(':id')
  async insert(
    @Param('id') id: number,
    @Body() data: O2O_SubRequest,
  ): Promise<boolean> {
    try {
      //return await this.subService.insert(id, data);
      return await this.subService.insert_QB(id, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //更新
  //【PUT】curl -XPUT -H "Content-Type: application/json" -d '{"photo":"123abc"}' http://localhost:3000/o2o_sub/1
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: O2O_SubRequest,
  ): Promise<boolean> {
    try {
      return await this.subService.update_QB(id, data);
      //return await this.subService.update(name, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //挿入/更新
  //【PUT】: DOMAIN/o2o_sub/ups
  //*postman引数 "Body:raw:json" {"id":1,"photo":"f34vwr32"}
  @Post('ups')
  async upsert(@Body() data: Partial<O2O_Sub>): Promise<boolean> {
    try {
      return await this.subService.upsert_QB(data);
      //return await this.subService.upsert(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //削除
  //【DELETE】: DOMAIN/o2o_sub/1
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      return await this.subService.delete_QB(id);
      //return await this.subService.delete(name);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
