import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetSongsDto {
  @IsNotEmpty()
  @IsNumber()
  limit: number;
  @IsNotEmpty()
  @IsNumber()
  page: number;
  @IsNumber()
  category?: number;
  @IsNumber()
  type?: number;
}
