import { Playlist } from 'src/services/playlist/entity/playlist.entity';
import { Song } from 'src/services/songs/entity/song.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'playlists_songs' })
export class PlayListSong {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => Playlist, (playlist) => playlist.id)
  // @JoinTable({
  //   name: 'playlists',
  //   joinColumn: {
  //     name: 'playlist',
  //     referencedColumnName: 'id',
  //   },
  // })
  playlist: number;

  @ManyToMany(() => Song, (song) => song.id)
  // @JoinTable({
  //   name: 'songs',
  //   joinColumn: {
  //     name: 'song',
  //     referencedColumnName: 'id',
  //   },
  // })
  song: number;
}
