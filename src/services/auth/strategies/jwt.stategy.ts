import { Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from 'src/config/configuration';

export class JwtStategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'qwej12ieh2187edhqwd',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
