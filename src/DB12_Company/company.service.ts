import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataCompany } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DataCompanyService {
  constructor(
    @InjectRepository(DataCompany)
    private readonly repoCompany: Repository<DataCompany>,
  ) {}

  //---------------------------------------------
  // Query
  //---------------------------------------------
  async findAll(): Promise<DataCompany[]> {
    const query = this.repoCompany.createQueryBuilder();
    return await query.getMany().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  //---------------------------------------------
  // insert
  //---------------------------------------------
  async insert(
    data: Partial<DataCompany> | Partial<DataCompany>[],
  ): Promise<boolean> {
    await this.repoCompany.insert(data).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  //---------------------------------------------
  // update
  //---------------------------------------------
  async update(id: number, data: Partial<DataCompany>): Promise<boolean> {
    await this.repoCompany
      .update(
        { id }, //SQL:where
        { ...data }, //SQL:values
      )
      .catch(e => {
        throw new InternalServerErrorException(e.message);
      });
    return true;
  }

  //---------------------------------------------
  // delete
  //---------------------------------------------
  async delete(id: number): Promise<boolean> {
    await this.repoCompany.delete({ id }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }
}
