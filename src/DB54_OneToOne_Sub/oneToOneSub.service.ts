import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { O2O_Sub } from './oneToOneSub.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { O2O_Main } from '../DB53_OneToOne_Main/oneToOneMain.entity';
import { O2O_SubRequest } from './dto/oneToOneSub.request.entity';

@Injectable()
export class O2O_SubService {
  constructor(
    @InjectRepository(O2O_Main)
    private readonly mainRepo: Repository<O2O_Main>,
    @InjectRepository(O2O_Sub)
    private readonly subRepo: Repository<O2O_Sub>,
  ) {}

  //---------------------------------------------
  // Query
  //---------------------------------------------
  async findAll() {
    return await this.subRepo
      .find({
        relations: {
          main: true,
        },
        // where: { main_id: 1 }, NG!
        //loadRelationIds: true,
      })
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  async findAll_QB() {
    return await this.subRepo.query('select * from o2o_sub').catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:one
  // async getByID(id: number) {
  //   return await this.subRepo.findOne({ where: { mainId:1 } });
  // }

  async getByID_QB(id: number) {
    return await this.subRepo
      .createQueryBuilder('sub')
      .select(['sub.memo', 'sub.main']) // NOT main_id !!!
      .where('main_id=:id', { id })
      .getOne()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  //find:Join
  async getAllJoined() {
    const sql = this.subRepo
      .createQueryBuilder('sub')
      //.select(['user.name', 'user.age']) // 'profile.photo' 無意味?

      .leftJoinAndSelect('sub.main', 'main'); //Left Outer Join
    // .innerJoinAndSelect('user.profile', 'profile'); //Left Inner Join

    console.log(sql.getQueryAndParameters());

    const result = await sql.getMany().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return result;
  }

  //---------------------------------------------
  // insert
  //---------------------------------------------
  async insert(id: number, data: O2O_SubRequest): Promise<boolean> {
    const main = await this.mainRepo.findOne({ where: { id } });
    if (!main) throw Error('Can`t get Main');
    await this.subRepo.insert({ ...data, main }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //【QB】
  async insert_QB(id: number, data: O2O_SubRequest): Promise<boolean> {
    const main = await this.mainRepo.findOne({ where: { id } }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    if (!main) throw Error('Can`t get Main');

    await this.subRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Sub)
      .values({ ...data, main })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  //---------------------------------------------
  // update
  //---------------------------------------------
  async update_QB(id: number, data: O2O_SubRequest): Promise<boolean> {
    await this.subRepo
      .createQueryBuilder()
      .update(O2O_Sub)
      .set(data)
      .where('main_id=:id', { id })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  //---------------------------------------------
  // upsert
  //---------------------------------------------
  async upsert_QB(data: Partial<O2O_Sub>): Promise<boolean> {
    await this.subRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Sub)
      .values(data)
      .orUpdate(['main', 'memo'], ['main'])
      //([update対象カラム,...],[重複チェックカラム])
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  //---------------------------------------------
  // delete
  //---------------------------------------------
  //QueryBuilder: delete
  async delete_QB(id: number): Promise<boolean> {
    await this.subRepo
      .createQueryBuilder()
      .delete()
      .from(O2O_Sub)
      .where('main_id=:id', { id })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }
}
