import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddSongToPlaylistDto {
  @IsNumber()
  @IsNotEmpty()
  song: number;
}
