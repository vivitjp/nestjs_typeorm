import { Column } from 'typeorm';

export class O2MKenRequest {
  @Column({ comment: '都道府県ID' })
  id: number;

  @Column('varchar', { length: 10, comment: '都道府県名' })
  name: string;
}
