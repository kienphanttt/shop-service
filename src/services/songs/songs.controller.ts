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
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserAuth } from 'src/utils/userAuth';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongService } from './songs.service';

@Controller('songs')
export class SongController {
  constructor(private readonly songsService: SongService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('file'))
  createProduct(@UploadedFile() file:Express.Multer.File, @Body() dto: any,@UserAuth() user: any) {
    return this.songsService.addNewSong(file,user.id,JSON.parse(dto.song))
  }

  @Get('id/:id')
  getSongDetails(@Param('id', new ParseIntPipe()) id: number) {
    return this.songsService.getSongDetails(id);
  }

  @Get('all')
  getSongs(@Request() req: any) {
    Object.keys(req.query).forEach((item) => {
      req.query[item] = Number(req.query[item]);
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

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file:Express.Multer.File,@Body()dto : any){
    console.log("req",file)
    console.log("name",dto.name)
    return 'uploaded'
  }
}
