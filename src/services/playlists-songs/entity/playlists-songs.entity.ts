import { Playlist } from 'src/services/playlist/entity/playlist.entity';
import { Song } from 'src/services/songs/entity/song.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'playlists_songs' })
export class PlayListSong {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => Playlist)
  playlist: number;

  @ManyToMany(() => Song)
  song: number;
}
