import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';

import { Task, TaskStatus } from './entities/task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  findAll() {
    return [...this.tasks];
  }

  findTasks(getTasksFilteredDto: GetTasksFilteredDto) {
    let tasks = this.findAll();

    const { status, search } = getTasksFilteredDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) throw new NotFoundException();

    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) throw new NotFoundException();

    Object.assign(this.tasks[taskIndex], updateTaskDto);
  }

  updateStatus(id: string, status: TaskStatus) {
    this.update(id, { status });
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) throw new NotFoundException();

    this.tasks.splice(taskIndex, 1);
  }
}
