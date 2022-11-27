import { Song } from 'src/services/songs/entity/song.entity';
import { User } from 'src/services/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: number;

  @ManyToOne(() => Song, { eager: true })
  @JoinTable({
    name: 'songs',
    joinColumn: {
      name: 'song',
      referencedColumnName: 'id',
    },
  })
  song: number;

  @Column()
  content: string;

  @Column({ default: new Date().toString() })
  commentDate: string;
}
