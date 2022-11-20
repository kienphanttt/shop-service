import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from '../playlist/entity/playlist.entity';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Playlist])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
