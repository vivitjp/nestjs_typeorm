import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataM2MSection } from './manyToMany.entity';

@Injectable()
export class DataM2MService {
  constructor(
    @InjectRepository(DataM2MSection)
    private readonly dataM2MRepository: Repository<DataM2MSection>,
  ) {}

  async findAll(): Promise<DataM2MSection[]> {
    return await this.dataM2MRepository.find().catch(e => {
      throw new InternalServerErrorException(e.message);
    });
  }
}
