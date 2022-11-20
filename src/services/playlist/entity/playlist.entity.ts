import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'playlist' })
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
