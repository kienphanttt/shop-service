import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  getUsers(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('limit', new ParseIntPipe()) limit: number,
  ) {
    return this.usersService.getUsers({ page, limit });
  }

  @Get('id/:id')
  getUserDetails(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.getUserDetails(id);
  }
}
