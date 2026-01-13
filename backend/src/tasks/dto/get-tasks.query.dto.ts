import { TaskDto } from './get-task.dto';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetTasksQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsIn(['createdAt', 'completed'])
  sortBy?: 'createdAt' | 'completed' = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}

export class TasksListMetaDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class TasksListResponseDto {
  items: TaskDto[];
  meta: TasksListMetaDto;
}
