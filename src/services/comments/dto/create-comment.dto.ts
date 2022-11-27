import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  song: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
