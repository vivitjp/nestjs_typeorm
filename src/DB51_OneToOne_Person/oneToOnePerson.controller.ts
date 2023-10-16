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
import { O2O_PersonService } from './oneToOnePerson.service';
import { ERROR_OBJECT } from '@/constants/errors';
import { oneToOnePersonRequest } from './dto/oneToOnePerson.request.entity';

@Controller('o2o_person') //URL
export class O2O_PersonController {
  constructor(private readonly personService: O2O_PersonService) {}

  //全取得
  //【GET】: http://localhost:3000/o2o_person/
  @Get()
  async findAll() {
    try {
      return await this.personService.findAll();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //部分取得(引数数値)
  //【GET】curl -XGET http://localhost:3000/o2o_person/1
  // *文字列から数値への Built-in pipes
  @Get('id/:id')
  async findByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.personService.getByID(id);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //全取得(Joined)
  //【GET】: http://localhost:3000/o2o_person/joined/
  @Get('joined')
  async findAllJoined() {
    try {
      return await this.personService.getAllJoined();
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //登録(新規保存)
  //【POST】curl -XPOST -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3000/o2o_person/
  @Post()
  async insert(@Body() data: oneToOnePersonRequest): Promise<boolean> {
    try {
      //return await this.personService.insert(data);
      return await this.personService.insert_QB(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //更新
  //【PUT】curl -XPUT -H "Content-Type: application/json" -d '{"age":28}' http://localhost:3000/o2o_person/1
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: oneToOnePersonRequest,
  ): Promise<boolean> {
    try {
      return await this.personService.update_QB(id, data);
      //return await this.personService.update(name, data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //挿入/更新
  //【PUT】: DOMAIN/o2o_person/ups
  //*postman引数 "Body:raw:json" {"name":"Steve","address":"Sendai"}
  @Post('ups')
  async upsert(@Body() data: oneToOnePersonRequest): Promise<boolean> {
    try {
      return await this.personService.upsert_QB(data);
      //return await this.personService.upsert(data);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }

  //削除
  //【DELETE】: DOMAIN/o2o_person/1
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    try {
      return await this.personService.delete_QB(id);
      //return await this.personService.delete(name);
    } catch (e) {
      throw new HttpException({ ...ERROR_OBJECT, error: e.message }, 500);
    }
  }
}
