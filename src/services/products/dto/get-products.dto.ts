import { IsNotEmpty, IsString } from 'class-validator';

export class GetProductsDto {
  @IsNotEmpty()
  @IsString()
  limit: number;
  @IsNotEmpty()
  @IsString()
  page: number;
}
