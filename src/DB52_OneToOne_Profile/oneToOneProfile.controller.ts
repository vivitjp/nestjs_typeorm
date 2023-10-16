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
import { O2O_ProfileService } from './oneToOneProfile.service';
import { ERROR_OBJECT } from '@/constants/errors';
import { oneToOnePersonRequest } from './dto/oneToOneProfile.request.entity';

@Controller('o2o_profile') //URL
export class O2O_ProfileController {
  constructor(private readonly profileService: O2O_ProfileService) {}

  //全取得
  //【GET】: http://localhost:3000/o2o_profile/
  @Get()
  async findAll() {
    try {
      return await this.profileService.findAll();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //部分取得(引数数値)
  //【GET】curl -XGET http://localhost:3000/o2o_profile/1
  // *文字列から数値への Built-in pipes
  @Get(':id')
  async findByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.profileService.getByID(id);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】curl -XPOST -H "Content-Type: application/json" -d '{"photo":"234vcs"}' http://localhost:3000/o2o_profile/3
  @Post(':id')
  async insert(
    @Param('id') id: number,
    @Body() data: oneToOnePersonRequest,
  ): Promise<boolean> {
    try {
      //return await this.profileService.insert(id, data);
      return await this.profileService.insert_QB(id, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】curl -XPOST -H "Content-Type: application/json" -d '{"photo":"234vcs"}' http://localhost:3000/o2o_profile/name/Gates
  @Post('name/:name')
  async insertByObject(
    @Param('name') name: string,
    @Body() data: oneToOnePersonRequest,
  ): Promise<boolean> {
    try {
      return await this.profileService.insertByOject(name, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //更新
  //【PUT】curl -XPUT -H "Content-Type: application/json" -d '{"photo":"123abc"}' http://localhost:3000/o2o_profile/1
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: oneToOnePersonRequest,
  ): Promise<boolean> {
    try {
      return await this.profileService.update_QB(id, data);
      //return await this.profileService.update(name, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //挿入/更新
  //【PUT】: DOMAIN/o2o_profile/ups
  //*postman引数 "Body:raw:json" {"id":1,"photo":"f34vwr32"}
  @Post('ups')
  async upsert(@Body() data: oneToOnePersonRequest): Promise<boolean> {
    try {
      return await this.profileService.upsert_QB(data);
      //return await this.profileService.upsert(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //削除
  //【DELETE】: DOMAIN/o2o_profile/1
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      return await this.profileService.delete_QB(id);
      //return await this.profileService.delete(name);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
