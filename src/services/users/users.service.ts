import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUsersDto } from './dto/get-users.dto';
import { User } from './entity/user.entity';
import { GetUsersResponse } from './interfaces/get-users.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(dto: GetUsersDto): Promise<GetUsersResponse> {
    const skipUserNumbers = dto.limit * dto.page - 1;

    const users = await this.usersRepository.find({
      skip: dto.page <= 1 ? 0 : skipUserNumbers,
      take: dto.limit,
    });

    console.log('users', users);

    return {
      status: 200,
      users,
    };
  }

  async getUserDetails(id: number) {
    if (!id) throw new BadRequestException('Invalid user id');

    const user = await this.usersRepository.findOneBy({ id });

    return {
      status: 200,
      user,
    };
  }
}
