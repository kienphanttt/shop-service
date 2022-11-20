import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/services/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Playlist } from '../playlist/entity/playlist.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) throw new BadRequestException('Invalid username or password');
    const isValidPassword = await argon2.verify(user.password, dto.password);

    if (!isValidPassword)
      throw new BadRequestException('Invalid username or password');

    const { accessToken, refreshToken } = await this.getTokens(user.id);

    user.refreshToken = refreshToken;

    await user.save();

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(dto: RegisterDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (user) {
      throw new BadRequestException('User already exist');
    }

    const playlist = this.playlistRepository.create();

    await playlist.save();

    console.log('playlist', playlist);

    await this.userRepository.save({
      ...dto,
      password: await argon2.hash(dto.password),
      playlist: playlist.id,
    });

    return {
      statusCode: 201,
      message: 'Created user successfully',
    };
  }

  async refreshToken(rt: string) {
    const decode = await this.jwtService.verify(rt);

    if (!decode) {
      throw new ForbiddenException();
    }

    const { accessToken, refreshToken } = await this.getTokens(decode.id);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getTokens(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        id: userId,
      }),
      this.jwtService.signAsync({
        id: userId,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
