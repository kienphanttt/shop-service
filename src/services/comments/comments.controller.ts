import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('create')
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
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
