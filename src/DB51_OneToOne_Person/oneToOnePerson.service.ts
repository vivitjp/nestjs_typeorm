import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { O2O_Person } from './oneToOnePerson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class O2O_PersonService {
  constructor(
    @InjectRepository(O2O_Person)
    private readonly personRepo: Repository<O2O_Person>,
  ) {}

  //---------------------------------------------
  // Query
  //---------------------------------------------
  async findAll(): Promise<O2O_Person[]> {
    return await this.personRepo.find().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:one
  async getByID(id: number): Promise<O2O_Person | null> {
    return await this.personRepo.findOne({ where: { id } }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:Join
  async getAllJoined(): Promise<O2O_Person[]> {
    const sql = this.personRepo
      .createQueryBuilder('user')
      .select(['user.name', 'user.age']) // 'profile.photo' 無意味?

      .leftJoinAndSelect('user.profile', 'profile'); //Left Outer Join
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
    data: Partial<O2O_Person> | Partial<O2O_Person>[],
  ): Promise<boolean> {
    await this.personRepo.insert(data).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //【QB】
  async insert_QB(
    data: Partial<O2O_Person> | Partial<O2O_Person>[],
  ): Promise<boolean> {
    await this.personRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Person)
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
  async update(id: number, data: Partial<O2O_Person>): Promise<boolean> {
    await this.personRepo
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
  async update_QB(id: number, data: Partial<O2O_Person>): Promise<boolean> {
    //const result: UpdateResult =
    await this.personRepo
      .createQueryBuilder()
      .update(O2O_Person)
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
  async upsert(data: Partial<O2O_Person>): Promise<boolean> {
    await this.personRepo
      .upsert(
        { ...data }, //SQL:values
        { conflictPaths: ['id'] }, //重複チェックカラム **Unique Index化必須!
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
    return true;
  }

  async upsert_QB(data: Partial<O2O_Person>): Promise<boolean> {
    await this.personRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Person)
      .values(data)
      .orUpdate(['name', 'age'], ['id'])
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
    await this.personRepo.delete({ id }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //QueryBuilder: delete
  async delete_QB(id: number): Promise<boolean> {
    await this.personRepo
      .createQueryBuilder()
      .delete()
      .from(O2O_Person)
      .where('id=:id', { id })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
    return true;
  }
}
