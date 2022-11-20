import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteSong } from './entity/favorite-song.entity';
import { FavoriteSongController } from './favorite-song.controller';
import { FavoriteSongService } from './favorite-song.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteSong])],
  controllers: [FavoriteSongController],
  providers: [FavoriteSongService],
})
export class FavoriteSongModule {}
