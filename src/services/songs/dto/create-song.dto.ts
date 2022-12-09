import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  image: string;
  @IsString()
  @IsNotEmpty()
  singer: string;
  @IsString()
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  price: number | null;
  @IsBoolean()
  @IsNotEmpty()
  isRelaxingWeekend: boolean;
  @IsBoolean()
  @IsNotEmpty()
  isTop100: boolean;
  @IsBoolean()
  @IsNotEmpty()
  isNewRelease: boolean;
  @IsNumber()
  @IsNotEmpty()
  category: number;
  @IsNumber()
  @IsNotEmpty()
  type: 1 | 0;
}
