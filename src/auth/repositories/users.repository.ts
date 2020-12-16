import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/user.entity';

import { CreateUserDto } from '../dto/create-user.dto copy';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { username, salt, hash } = createUserDto;

    const user = this.create({
      username,
      salt,
      hash,
    });

    await this.save(user);

    return user;
  }
}
