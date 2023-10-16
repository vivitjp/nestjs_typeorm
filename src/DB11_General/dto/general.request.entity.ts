import { Column } from 'typeorm';

export class GeneralRequest {
  @Column({ comment: '名前' })
  name: string;

  @Column({ comment: '年齢' })
  age: number;

  @Column({ comment: '有効' })
  act?: boolean;
}
