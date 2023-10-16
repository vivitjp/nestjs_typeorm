import { Max } from 'class-validator';
import { O2O_Profile } from '../DB52_OneToOne_Profile/oneToOneProfile.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
} from 'typeorm';

@Entity('o2o_person') //Mainテーブル名
export class O2O_Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('varchar', {
    length: 16,
    comment: 'Name',
    default: '',
    nullable: false,
  })
  name: string;

  @Max(100)
  @Column({ default: 0, comment: '年齢' })
  age?: number;

  @OneToOne(
    () => O2O_Profile,
    profile => profile.person,
  )
  //@JoinColumn() 設定不可！
  profile: O2O_Profile;

  //Constructor
  constructor(name: string) {
    this.name = name;
  }
}
