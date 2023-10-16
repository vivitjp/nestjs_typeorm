import { Column } from 'typeorm';

export class CompanyRequest {
  @Column({ comment: '名前' })
  name: string;

  @Column({ comment: '都市' })
  city: number;
}
