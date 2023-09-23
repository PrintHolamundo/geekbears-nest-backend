import { Controller, Get, Post, Body, Query, Patch, Param, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { users } from './entities/user.entity';
import { ResetPasswordDto } from './dto/resetPassword.dto';

@ApiTags('Users')
// @ApiBearerAuth()
// @Auth()
@Controller('auth')
@ApiResponse({ type: users })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() crearUsuarioDto: CreateUserDto) {
    return this.authService.create(crearUsuarioDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@GetUser() user: users, @GetUser('fullName') userUsername: string) {
    return {
      ok: true,
      message: 'Hola Privado',
      user,
      userUsername,
    };
  }
}
