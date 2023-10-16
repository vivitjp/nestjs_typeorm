import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { O2O_Main } from './oneToOneMain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { O2O_Sub } from '../DB54_OneToOne_Sub/oneToOneSub.entity';

@Injectable()
export class O2O_MainService {
  constructor(
    @InjectRepository(O2O_Main)
    private readonly mainRepo: Repository<O2O_Main>,
  ) {}

  //---------------------------------------------
  // Query
  //---------------------------------------------
  async findAll(): Promise<O2O_Main[]> {
    return await this.mainRepo.find().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:one
  async getByID(id: number): Promise<O2O_Main | null> {
    return await this.mainRepo.findOne({ where: { id } }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:Join
  async getAllJoinedQuery(): Promise<O2O_Main[]> {
    return await this.mainRepo
      .query(
        `SELECT main.id, main.name, sub.memo
        FROM o2o_main main, o2o_sub sub
        WHERE main.id = sub.main_id`,
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
  }

  async getAllJoined(): Promise<O2O_Main[]> {
    const sql = this.mainRepo
      .createQueryBuilder('o2o_main')
      .select(['o2o_main.id', 'o2o_main.name'])
      .leftJoinAndSelect('o2o_main', 'o2o_sub', 'o2o_main.id=o2o_sub.main_id'); //Left Outer Join

    //.leftJoinAndSelect(O2O_Sub, 'o2o_sub', 'o2o_main.id=o2o_sub.mainId'); //Left Outer Join
    //.leftJoinAndSelect(DataCompany, 'company', 'gen.id=company.generalId') //Entity
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
  async insert(
    data: Partial<O2O_Main> | Partial<O2O_Main>[],
  ): Promise<boolean> {
    await this.mainRepo.insert(data).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //【QB】
  async insert_QB(
    data: Partial<O2O_Main> | Partial<O2O_Main>[],
  ): Promise<boolean> {
    await this.mainRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Main)
      .values(data) //配列もOK , act: false
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  //---------------------------------------------
  // update
  //---------------------------------------------
  async update(id: number, data: Partial<O2O_Main>): Promise<boolean> {
    await this.mainRepo
      .update(
        { id }, //SQL:where
        { ...data }, //SQL:values
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
    return true;
  }

  //【QB】
  async update_QB(id: number, data: Partial<O2O_Main>): Promise<boolean> {
    //const result: UpdateResult =
    await this.mainRepo
      .createQueryBuilder()
      .update(O2O_Main)
      .set(data)
      .where('id=:id', { id })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  //---------------------------------------------
  // upsert
  //---------------------------------------------
  async upsert(data: Partial<O2O_Main>): Promise<boolean> {
    await this.mainRepo
      .upsert(
        { ...data }, //SQL:values
        { conflictPaths: ['id'] }, //重複チェックカラム **Unique Index化必須!
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  async upsert_QB(data: Partial<O2O_Main>): Promise<boolean> {
    await this.mainRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Main)
      .values(data)
      .orUpdate(['name'], ['id'])
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
  async delete(id: number): Promise<boolean> {
    await this.mainRepo.delete({ id }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //QueryBuilder: delete
  async delete_QB(id: number): Promise<boolean> {
    await this.mainRepo
      .createQueryBuilder()
      .delete()
      .from(O2O_Main)
      .where('id=:id', { id })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }
}
