import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signup(authCredentialsDto);
  }

  @Post('signin')
  signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signin(authCredentialsDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user) {
    console.log(user);
  }
}
