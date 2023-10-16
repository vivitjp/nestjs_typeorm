import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { O2MKen } from './O2MKen.entity';

@Injectable()
export class O2MKenService {
  constructor(
    @InjectRepository(O2MKen)
    private readonly repoKen: Repository<O2MKen>,
  ) {}

  async findAll(): Promise<O2MKen[]> {
    return await this.repoKen.find().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async insert(data: Partial<O2MKen>): Promise<boolean> {
    await this.repoKen.insert({ ...data }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  async update(id: number, data: Partial<O2MKen>): Promise<boolean> {
    await this.repoKen.update({ id }, { ...data }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.repoKen.delete({ id }).catch(e => {
      throw new InternalServerErrorException(e.message);
    });
    return true;
  }
}
