import { TaskStatus } from '../entities/task.entity';

export class GetTasksFilteredDto {
  status: TaskStatus;
  search: string;
}
