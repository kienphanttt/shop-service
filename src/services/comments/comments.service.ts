import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(dto: any) {
    console.log('dto', dto);
    const comment = await this.commentRepository.save(dto);
    return {
      status: 200,
      message: 'Commented',
      comment,
    };
  }

  async delete(id: number) {
    await this.commentRepository.delete(id);
    return {
      status: 200,
      message: 'Comment deleted',
    };
  }

  async getComments(songId: number) {
    console.log('songId', songId);
    const comments = await this.commentRepository.find({
      where: {
        song: songId,
      },
    });
    console.log('length', comments.length);
    return {
      status: 200,
      comments,
    };
  }
}
