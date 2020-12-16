import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { User } from 'src/auth/entities/user.entity';

import { TasksRepository } from './repositories/tasks.repository';
import { TaskStatus } from './entities/task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TasksService');

  constructor(private readonly tasksRepository: TasksRepository) {}

  create(createTaskDto: CreateTaskDto, user: User) {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  findTasks(getTasksFilteredDto: GetTasksFilteredDto, user: User) {
    return this.tasksRepository.findTasksFiltered(getTasksFilteredDto, user);
  }

  async findOne(id: string, user: User) {
    const task = await this.tasksRepository.findOne({ id, userId: user.id });

    if (!task) {
      const err = new NotFoundException();

      this.logger.error(
        `Failed to find task with ID ${id} for user ${user.username}`,
        err.stack,
      );

      throw err;
    }

    return task;
  }

  async updateStatus(id: string, status: TaskStatus, user: User) {
    const task = await this.tasksRepository.findOne({ id, userId: user.id });

    if (!task) throw new NotFoundException();

    task.status = status;

    await this.tasksRepository.save(task);
  }

  async remove(id: string, user: User) {
    const deleteResult = await this.tasksRepository.delete({
      id,
      userId: user.id,
    });

    if (deleteResult.affected === 0) throw new NotFoundException();
  }
}
