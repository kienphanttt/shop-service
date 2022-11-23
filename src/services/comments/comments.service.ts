import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(dto: CreateCommentDto) {
    await this.commentRepository.save(dto);
    return {
      status: 200,
      message: 'Commented',
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
    const comments = await this.commentRepository.find({
      where: {
        song: songId,
      },
    });

    return {
      status: 200,
      comments,
    };
  }
}
