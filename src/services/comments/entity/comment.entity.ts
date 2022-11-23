import { Song } from 'src/services/songs/entity/song.entity';
import { User } from 'src/services/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: number;

  @ManyToOne(() => Song)
  song: number;

  @Column()
  content: string;

  @Column({ default: new Date() })
  commentDate: string;
}
