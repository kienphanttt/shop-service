import { IsNotEmpty, IsString } from 'class-validator';

export class GetUsersDto {
  @IsNotEmpty()
  @IsString()
  limit: number;
  @IsNotEmpty()
  @IsString()
  page: number;
}
