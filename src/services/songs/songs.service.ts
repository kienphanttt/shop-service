import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSongsDto } from './dto/get-songs.dto';
import { Song } from './entity/song.entity';
import { GetSongsResponse } from './interfaces/get-songs.response';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  async addNewSong(userId: number, dto: CreateSongDto) {
    await this.songRepository.save({
      ...dto,
      createdBy: userId,
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
    const skipProductNumbers = dto.limit * dto.page - 1;

    const songs = await this.songRepository.find({
      skip: dto.page <= 1 ? 0 : skipProductNumbers,
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
        modifiedAt: 'ASC',
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
}
