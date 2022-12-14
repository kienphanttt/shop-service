import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { Playlist } from '../playlist/entity/playlist.entity';
import { User } from '../users/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStategy } from './strategies/jwt.stategy';
require('dotenv').config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ConfigModule.forFeature(configuration),
    TypeOrmModule.forFeature([User, Playlist]),
  ],
  providers: [AuthService, JwtStategy],
  controllers: [AuthController],
})
export class AuthModule {}
