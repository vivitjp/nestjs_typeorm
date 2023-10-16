import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity('m2m_person')
export class DataM2MPerson {
  @PrimaryColumn()
  id: number;

  @Column('varchar', { length: 16, comment: 'Name' })
  name: string;
}

@Entity('m2m_section')
export class DataM2MSection {
  @PrimaryColumn()
  id: number;

  @Column('varchar', { length: 16, comment: 'Name' })
  name: string;

  @ManyToMany(() => DataM2MPerson)
  @JoinTable()
  person: DataM2MPerson[];
}
