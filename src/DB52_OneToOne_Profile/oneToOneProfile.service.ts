import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { O2O_Profile } from './oneToOneProfile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { O2O_Person } from '../DB51_OneToOne_Person/oneToOnePerson.entity';

@Injectable()
export class O2O_ProfileService {
  constructor(
    @InjectRepository(O2O_Person)
    private readonly personRepo: Repository<O2O_Person>,
    @InjectRepository(O2O_Profile)
    private readonly profileRepo: Repository<O2O_Profile>,
  ) {}

  //---------------------------------------------
  // Query
  //---------------------------------------------
  async findAll(): Promise<O2O_Profile[]> {
    return await this.profileRepo.find().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //find:one
  async getByID(id: number): Promise<O2O_Profile | null> {
    return await this.profileRepo.findOne({ where: { id } }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //---------------------------------------------
  // insert
  //---------------------------------------------
  async insert(
    id: number,
    data: Partial<O2O_Profile> | Partial<O2O_Profile>[],
  ): Promise<boolean> {
    const person = await this.personRepo.findOne({ where: { id } });
    if (!person) throw Error('Can`t get Person');
    await this.profileRepo.insert({ ...data, person }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  async insertByOject(
    name: string,
    data: Partial<O2O_Profile> | Partial<O2O_Profile>[],
  ): Promise<boolean> {
    const person = new O2O_Person(name);
    await this.profileRepo.insert({ ...data, person }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //【QB】
  async insert_QB(
    id: number,
    data: Partial<O2O_Profile> | Partial<O2O_Profile>[],
  ): Promise<boolean> {
    const person = await this.personRepo.findOne({ where: { id } }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    if (!person) throw Error('Can`t get Person');

    await this.profileRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Profile)
      .values({ ...data, person })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  //---------------------------------------------
  // update
  //---------------------------------------------
  async update(id: number, data: Partial<O2O_Profile>): Promise<boolean> {
    await this.profileRepo
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
  async update_QB(id: number, data: Partial<O2O_Profile>): Promise<boolean> {
    await this.profileRepo
      .createQueryBuilder()
      .update(O2O_Profile)
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
  async upsert(data: Partial<O2O_Profile>): Promise<boolean> {
    await this.profileRepo
      .upsert(
        { ...data }, //SQL:values
        { conflictPaths: ['id'] }, //重複チェックカラム **Unique Index化必須!
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }

  async upsert_QB(data: Partial<O2O_Profile>): Promise<boolean> {
    await this.profileRepo
      .createQueryBuilder()
      .insert()
      .into(O2O_Profile)
      .values(data)
      .orUpdate(['id', 'photo'], ['id'])
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
    await this.profileRepo.delete({ id }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //QueryBuilder: delete
  async delete_QB(id: number): Promise<boolean> {
    await this.profileRepo
      .createQueryBuilder()
      .delete()
      .from(O2O_Profile)
      .where('id=:id', { id })
      .execute()
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });

    return true;
  }
}
