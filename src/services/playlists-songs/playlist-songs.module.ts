import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayListSong } from './entity/playlists-songs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayListSong])],
})
export class PlaylistsSongsModule {}
