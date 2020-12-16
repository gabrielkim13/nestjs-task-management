import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const entitiesGlob = path.resolve(__dirname, '..', '**/*.entity.{js,ts}');

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [entitiesGlob],
  synchronize: true,
};
