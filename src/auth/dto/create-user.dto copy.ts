export class CreateUserDto {
  username: string;
  salt: string;
  hash: string;
}
