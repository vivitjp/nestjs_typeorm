import { O2O_Main } from '../DB53_OneToOne_Main/oneToOneMain.entity';
import { Entity, Column, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('o2o_sub') //接続テーブル名
export class O2O_Sub {
  @PrimaryColumn('int', { name: 'main_id' })
  @OneToOne(() => O2O_Main)
  @JoinColumn([{ name: 'main_id', referencedColumnName: 'id' }])
  main: O2O_Main;

  @Column({ comment: 'Memo' })
  memo: string;
}

// @PrimaryGeneratedColumn()
// id: number;
// @OneToOne(() => O2O_Main)
// @JoinColumn({ name: 'mainId', referencedColumnName: 'id' }) //参照先を指定
// main: O2O_Main;
