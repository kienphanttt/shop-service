import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSongsDto } from './dto/get-songs.dto';
import { Song } from './entity/song.entity';
import { GetSongsResponse } from './interfaces/get-songs.response';
import { CreateSongDto } from './dto/create-song.dto';
import { AddSongToPlaylistDto } from './dto/add-song-to-playlist.dto';
import { PlayListSong } from '../playlists-songs/entity/playlists-songs.entity';
import { User } from '../users/entity/user.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(PlayListSong)
    private playlistSong: Repository<PlayListSong>,
    @InjectRepository(User) private userRepository: Repository<User>,
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

  async addSongToPlaylist(userId: number, dto: AddSongToPlaylistDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    console.log('user', user.playlist);

    const isExisted = await this.playlistSong.findOneBy({
      playlist: user.playlist,
      song: dto.song,
    });

    if (isExisted) {
      return {
        status: 200,
        message: 'Song added to your playlist',
      };
    }

    await this.playlistSong.save(dto);

    return {
      status: 200,
      message: 'Song added to your playlist',
    };
  }

  async getPlaylistSongs(playlist: number) {
    const songs = await this.playlistSong.find({
      where: {
        playlist,
      },
    });

    return {
      status: 200,
      songs,
    };
  }

  async deleteSongFromPlaylist({
    song,
    playlist,
  }: {
    song: number;
    playlist: number;
  }) {
    const item = await this.playlistSong.findOne({
      where: {
        song,
        playlist,
      },
    });

    await this.playlistSong.delete(item);
    return {
      status: 200,
      message: 'Song deleted',
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
}
