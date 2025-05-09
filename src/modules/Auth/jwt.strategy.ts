import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'jhy300', // In production, use environment variables
    });
  }

  async validate(payload: any) {
    // Validate if user ID matches our simulated user
    if (payload.sub !== '3000250' || payload.username !== 'momen') {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return { userId: payload.sub, username: payload.username };
  }
}