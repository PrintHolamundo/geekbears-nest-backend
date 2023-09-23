import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { users } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(users.name)
    private readonly AuthModel: Model<users>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<users> {
    const { email } = payload;
    const user = await this.AuthModel.findOne({ email: email });
    if (!user) throw new UnauthorizedException('Token Invalido');
    if (!user.email) throw new UnauthorizedException('Usuario inactivo notificar al administrador');

    return user;
  }
}
