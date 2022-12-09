import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSongsDto } from './dto/get-songs.dto';
import { Song } from './entity/song.entity';
import { GetSongsResponse } from './interfaces/get-songs.response';
import { CreateSongDto } from './dto/create-song.dto';
import * as fs from 'fs'
import {v4} from 'uuid'
@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  async addNewSong(file:Express.Multer.File,userId: number, dto: CreateSongDto) {

    const fileExtension = file.originalname.split('.')[1]

    const url = `public/data/songs/${file.originalname}-${v4()}.${fileExtension}`

    fs.writeFileSync(url,file.buffer)

    await this.songRepository.save({
      ...dto,
      createdBy: userId,
      url: url.substring(url.indexOf("/")+1)
    });

    return {
      status: 200,
      message: 'Song saved',
    };
  }

  async getSongDetails(id: number) {
    const song = await this.songRepository.findOneBy({
      id,
    });

    if (song == null) throw new BadRequestException('Invalid product id');

    return {
      status: 200,
      song,
    };
  }

  async getSongs(dto: GetSongsDto): Promise<GetSongsResponse> {
    const skipSongsNumbers = dto.limit * dto.page - 1;

    const songs = await this.songRepository.find({
      skip: dto.page == 0 ? 0 : skipSongsNumbers,
      take: dto.limit,
      cache: true,
      where: {
        category: dto.category,
        type: dto.type,
      },
      relations: {
        createdBy: true,
      },
      order: {
        modifiedAt: 'DESC',
      },
    });
    return {
      status: 200,
      songs,
    };
  }

  async updateSong(userId: number, id: number, dto: any) {
    await this.songRepository.update(id, {
      ...dto,
      modifiedAt: new Date().toString(),
      modifiedBy: userId,
    });

    return {
      status: 200,
      message: 'Product updated',
    };
  }

  async deleteSong(id: number) {
    await this.songRepository.delete(id);
    return {
      status: 200,
      message: 'Product deleted',
    };
  }

  async uploadFile(dto:any,file: Express.Multer.File){

    console.log("dto",dto)
    console.log("file",file)

    return 'uploaded'
  }
}
