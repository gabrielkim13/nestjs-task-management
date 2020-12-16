import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

import { TaskStatus } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

import { GetTasksFilteredDto } from './dto/get-tasks-filtered.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  findTasks(
    @Query(ValidationPipe) getTasksFilteredDto: GetTasksFilteredDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.findTasks(getTasksFilteredDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateStatus(id, status, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
