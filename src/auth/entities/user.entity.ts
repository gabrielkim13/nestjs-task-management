import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Task } from 'src/tasks/entities/task.entity';

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
