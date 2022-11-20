import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Song } from './entity/song.entity';
import { SongController } from './songs.controller';
import { SongService } from './songs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
