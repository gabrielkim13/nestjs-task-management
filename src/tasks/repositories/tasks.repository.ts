import { EntityRepository, Repository } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';

import { Task, TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilteredDto } from '../dto/get-tasks-filtered.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }

  findTasksFiltered(getTasksFilteredDto: GetTasksFilteredDto, user: User) {
    const { status, search } = getTasksFilteredDto;

    const queryBuilder = this.createQueryBuilder('task').where({
      userId: user.id,
    });

    if (!!status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (!!search) {
      queryBuilder.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    return queryBuilder.getMany();
  }
}
