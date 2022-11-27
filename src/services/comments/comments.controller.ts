import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserAuth } from 'src/utils/userAuth';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createComment(@UserAuth() user: any, @Body() dto: CreateCommentDto) {
    return this.commentsService.create({
      ...dto,
      user: user.id,
    });
  }

  @Delete('delete/:id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.commentsService.delete(id);
  }

  @Get('song')
  getComments(@Query('id', new ParseIntPipe()) id: number) {
    return this.commentsService.getComments(id);
  }
}
