import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('refresh-token')
  refreshToken(@Req() req: Request) {
    // return this.authService.refreshToken(req.user.id, req.headers.refreshToken);
    const headers = req.headers as Headers;
    console.log('headers', headers);
    // return this.authService.refreshToken(headers.refreshToken);
    return 'refresh';
  }
}
