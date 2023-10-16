import { Column } from 'typeorm';

export class oneToOnePersonRequest {
  @Column({ comment: 'URL' })
  photo: string;
}
