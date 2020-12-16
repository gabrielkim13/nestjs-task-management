import { EntityRepository, FindConditions, Like, Repository } from 'typeorm';

import { Task, TaskStatus } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilteredDto } from '../dto/get-tasks-filtered.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }

  findTasksFiltered(getTasksFilteredDto: GetTasksFilteredDto) {
    const { status, search } = getTasksFilteredDto;

    const queryBuilder = this.createQueryBuilder('task');

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
