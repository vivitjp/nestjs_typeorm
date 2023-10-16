import { O2MKen } from '../DB21_OneToMany/O2MKen.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

@Entity('m2o_city')
export class M2OCity {
  @PrimaryColumn({ comment: '市町村ID' })
  id: number;

  @Index()
  @Column('varchar', { length: 16, comment: '市町村Name' })
  name: string;

  // @Column({ comment: 'City ID' })
  // city_id: number;

  @ManyToOne(
    () => O2MKen,
    ken => ken.id,
    {
      createForeignKeyConstraints: true,
      persistence: false,
      nullable: false,
      cascade: true,
    },
  )
  @JoinColumn({
    //name: 'ken_id', // 作成カラム名 => defaultで作成 kenId
    referencedColumnName: 'id', // OneToMany側のコネクトカラム
  })
  ken?: O2MKen; //ORM管理カラム名
}
