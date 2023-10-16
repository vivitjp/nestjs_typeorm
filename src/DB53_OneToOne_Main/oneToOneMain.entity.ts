import { O2O_Sub } from '../DB54_OneToOne_Sub/oneToOneSub.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('o2o_main') //Mainテーブル名
export class O2O_Main {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 16,
    comment: 'Name',
    default: '',
    nullable: false,
  })
  name: string;
}
