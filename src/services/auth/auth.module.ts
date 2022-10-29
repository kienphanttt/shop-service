import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStategy } from './strategies/jwt.stategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'qwej12ieh2187edhqwd',
      signOptions: {
        expiresIn: 360,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStategy],
  controllers: [AuthController],
})
export class AuthModule {}
