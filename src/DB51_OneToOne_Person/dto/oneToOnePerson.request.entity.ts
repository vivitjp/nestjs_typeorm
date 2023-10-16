import { Column } from 'typeorm';

export class oneToOnePersonRequest {
  @Column({ comment: '名前' })
  name: string;
}
