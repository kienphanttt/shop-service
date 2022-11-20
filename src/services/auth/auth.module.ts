import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from '../playlist/entity/playlist.entity';
import { User } from '../users/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStategy } from './strategies/jwt.stategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User, Playlist]),
  ],
  providers: [AuthService, JwtStategy],
  controllers: [AuthController],
})
export class AuthModule {}
