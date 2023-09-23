import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { users } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(users.name)
    private readonly AuthModel: Model<users>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...userData } = createUserDto;

    // Check if the user already exists
    const userExists = await this.AuthModel.exists({ email });
    if (userExists) {
      throw new BadRequestException('The user is already taken');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await this.AuthModel.create({
      ...userData,
      email,
      password: hashedPassword,
    });

    // Generate the JWT token
    const token = this.getJwtToken({ email: user.email });

    return { user, token };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.AuthModel.findOne(
      {
        email: email,
      },
      {
        email: true,
        password: true,
        id: true,
      },
    );
    if (!user) throw new UnauthorizedException('Invalid credentials (username)');

    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Invalid credentials (password)');
    return {
      email: user.email,
      user: user,
      token: this.getJwtToken({ email: user.email }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
