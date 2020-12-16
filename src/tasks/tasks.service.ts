import { Injectable, NotFoundException } from '@nestjs/common';

import { TasksRepository } from './repositories/tasks.repository';
import { TaskStatus } from './entities/task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.createTask(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findTasks(getTasksFilteredDto: GetTasksFilteredDto) {
    return this.tasksRepository.findTasksFiltered(getTasksFilteredDto);
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne(id);

    if (!task) throw new NotFoundException();

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne(id);

    if (!task) throw new NotFoundException();

    Object.assign(task, updateTaskDto);

    await this.tasksRepository.save(task);
  }

  async updateStatus(id: string, status: TaskStatus) {
    await this.update(id, { status });
  }

  async remove(id: string) {
    const deleteResult = await this.tasksRepository.delete(id);

    if (deleteResult.affected === 0) throw new NotFoundException();
  }
}
