import { M2OCity } from '../DB22_ManyToOne/M2OCity.entity';
import { Entity, Column, PrimaryColumn, OneToMany, Index } from 'typeorm';

@Entity('o2m_ken')
export class O2MKen {
  @PrimaryColumn({ comment: '都道府県ID' })
  id: number;

  @Index()
  @Column('varchar', { length: 10, comment: '都道府県Name' })
  name: string;

  @OneToMany(
    () => M2OCity,
    city => city.id,
    {
      createForeignKeyConstraints: true,
      persistence: false,
      cascade: true,
    },
  )
  readonly city: M2OCity[];
}
