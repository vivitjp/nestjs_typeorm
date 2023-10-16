import { MaxLength } from 'class-validator';
import { Base } from '../entities/base.entity';
import { Entity, Column, Unique } from 'typeorm';

@Entity('company')
@Unique(['name'])
export class DataCompany extends Base {
  @MaxLength(10) //OK
  @Column('varchar', { length: 16, comment: '名前', nullable: false })
  name: string;

  @Column({ comment: '都市' })
  city: string;

  @Column({ comment: 'GenID' })
  generalId: number;
}
