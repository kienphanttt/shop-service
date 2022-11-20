import { Song } from 'src/services/songs/entity/song.entity';
import { User } from 'src/services/users/entity/user.entity';
import {
  BaseEntity,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'fovorite_songs' })
export class FavoriteSong extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  user: number;

  @ManyToMany(() => Song)
  song: number;
}
