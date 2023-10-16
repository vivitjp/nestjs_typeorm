import { Column } from 'typeorm';

export class O2O_SubRequest {
  @Column({ comment: 'Memo' })
  memo: string;
}
