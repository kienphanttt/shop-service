import { Controller, Get } from '@nestjs/common';
import { FavoriteSongService } from './favorite-song.service';
import { Post, Delete, Body, ParseIntPipe, Param } from '@nestjs/common';
import { UserAuth } from 'src/utils/userAuth';
@Controller('favorite')
export class FavoriteSongController {
  constructor(private readonly favSongService: FavoriteSongService) {}

  @Get('all')
  getFavSongs(@UserAuth() user: any) {
    return this.favSongService.getFavSongs(user.id);
  }

  @Post('add')
  addFavoriteSong(@UserAuth() user: any, @Body() dto: any) {
    return this.favSongService.addFavoriteSong(user.id, dto.songId);
  }

  @Delete('add/:id')
  deleteFavoriteSong(@Param('id', new ParseIntPipe()) id: number) {
    return this.favSongService.deleteSong(id);
  }
}
