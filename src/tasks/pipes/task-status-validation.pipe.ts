import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { TaskStatus } from '../entities/task.entity';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    value = value.toUpperCase();

    if (!Object.values(TaskStatus).includes(value)) {
      throw new BadRequestException(`${value} is an invalid TaskStatus.`);
    }

    return value;
  }
}
