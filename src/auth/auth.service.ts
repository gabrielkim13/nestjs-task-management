import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './repositories/users.repository';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ username });

    if (!!user) throw new ConflictException('Username is already taken');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return this.usersRepository.createUser({ username, salt, hash });
  }

  async signin(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user) throw new UnauthorizedException();

    const expectedHash = await bcrypt.hash(password, user.salt);

    if (expectedHash !== user.hash) throw new UnauthorizedException();

    const payload: JwtPayload = { username };
    const token = await this.jwtService.sign(payload);

    return { token };
  }
}
