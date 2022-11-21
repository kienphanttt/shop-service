import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { UserAuth } from 'src/utils/userAuth';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongService } from './songs.service';

@Controller('songs')
export class SongController {
  constructor(private readonly songsService: SongService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createProduct(@UserAuth() user: any, @Body() dto: CreateSongDto) {
    return this.songsService.addNewSong(user.id, dto);
  }

  @Get('id/:id')
  getSongDetails(@Param('id', new ParseIntPipe()) id: number) {
    return this.songsService.getSongDetails(id);
  }

  @Get('all')
  getSongs(@Request() req: any) {
    Object.keys(req.query).forEach((item) => {
      req.query[item] = parseInt(req.query[item]);
    });

    return this.songsService.getSongs(req.query);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  updateSong(
    @UserAuth() user: any,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateSongDto,
  ) {
    return this.songsService.updateSong(user.id, id, dto);
  }

  @Delete('delete')
  deleteSong(@Query('id', new ParseIntPipe()) id: number) {
    return this.songsService.deleteSong(id);
  }
}
