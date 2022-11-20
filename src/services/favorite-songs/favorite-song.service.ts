import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteSong } from './entity/favorite-song.entity';
@Injectable()
export class FavoriteSongService {
  constructor(
    @InjectRepository(FavoriteSong)
    private readonly favoriteSongRepository: Repository<FavoriteSong>,
  ) {}

  async getFavSongs(userId: number) {
    const songs = await this.favoriteSongRepository.find({
      where: {
        user: userId,
      },
    });

    return {
      status: 200,
      songs: songs.length > 0 ? songs : [],
    };
  }

  async addFavoriteSong(userId: number, songId: number) {
    const song = await this.favoriteSongRepository.findOneBy({
      user: userId,
      song: songId,
    });

    if (song)
      return {
        status: 200,
        message: 'Song already in favorite',
      };

    await this.favoriteSongRepository.save({
      user: userId,
      song: songId,
    });

    return {
      status: 200,
      message: 'Song added to favorite',
    };
  }

  async deleteSong(id: number) {
    await this.favoriteSongRepository.delete(id);
    return {
      status: 200,
      message: 'Song deleted',
    };
  }
}
