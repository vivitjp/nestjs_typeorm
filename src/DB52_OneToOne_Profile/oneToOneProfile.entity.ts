import { O2O_Person } from '../DB51_OneToOne_Person/oneToOnePerson.entity';
import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('o2o_profile') //接続テーブル名
export class O2O_Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'URL' })
  photo: string;

  @OneToOne(
    () => O2O_Person,
    person => person.profile,
    { cascade: true }, //無効！ON DELETE CASCADE ON UPDATE CASCADE
  )
  @JoinColumn() //参照先を指定
  person: O2O_Person;
}
