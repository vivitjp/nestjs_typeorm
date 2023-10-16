import { IsOptional, Max, MaxLength } from 'class-validator';
import { Base } from '../entities/base.entity';
import { Entity, Column, Unique } from 'typeorm';

@Entity('general')
@Unique(['name'])
export class DataGeneral extends Base {
  //@Index() Uniqueあるので不要
  @MaxLength(10) //OK
  @Column('varchar', { length: 16, comment: '名前', nullable: false })
  name: string;

  @Max(100)
  @Column({ comment: '年齢' })
  age: number;

  @IsOptional()
  @Column({ comment: '有効', default: false })
  act?: boolean;
  // act? でなくとも、default: false の指定があれば SQL はinsert OK
  // TS と SQL 必須項目は別物
}

// @Entity('extra')
// abstract class Extra {
//   @Column({ comment: '年齢' })
//   age: number;

//   @Column({ comment: '有効', default: false })
//   act: boolean;
// }

// @Column(() => Extra)
// extra: Extra;

// extends を使用すると、カラム名が <extends><extendsColum>となり、
// type名と相違が生じる

// ■ Column Options
//{ update: false }
// orphanedRowAction : "nullify" | "delete"
