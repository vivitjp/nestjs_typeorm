import { Column } from 'typeorm';

export class M2OCityRequest {
  @Column({ comment: '市町村ID' })
  id: number;

  @Column('varchar', { length: 16, comment: '市町村名' })
  name: string;

  @Column({ comment: '都道府県ID' })
  ken_id: number;
}
