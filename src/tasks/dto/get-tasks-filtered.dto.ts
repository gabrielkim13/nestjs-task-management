import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

import { TaskStatus } from '../entities/task.entity';

export class GetTasksFilteredDto {
  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
