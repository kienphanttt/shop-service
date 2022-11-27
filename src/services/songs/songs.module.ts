import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayListSong } from '../playlists-songs/entity/playlists-songs.entity';
import { User } from '../users/entity/user.entity';

import { Song } from './entity/song.entity';
import { SongController } from './songs.controller';
import { SongService } from './songs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song, PlayListSong, User])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
