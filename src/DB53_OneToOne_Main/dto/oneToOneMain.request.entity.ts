import { Column } from 'typeorm';

export class oneToOneMainRequest {
  @Column({ comment: '名前' })
  name: string;
}
