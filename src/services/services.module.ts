import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FavoriteSongModule } from './favorite-songs/favorite-song.module';
import { PlaylistModule } from './playlist/playlist.module';
import { PlaylistsSongsModule } from './playlists-songs/playlist-songs.module';
import { SongModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    SongModule,
    FavoriteSongModule,
    PlaylistModule,
    PlaylistsSongsModule,
    AuthModule,
  ],
})
export class ServicesModule {}
