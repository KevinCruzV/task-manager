import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Delete,
  Req,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksQueryDto } from './dto/get-tasks.query.dto';
import { TasksListResponseDto } from './dto/get-tasks.query.dto';
import { TaskDto } from './dto/get-task.dto';
import { Throttle } from '@nestjs/throttler';

export type AuthRequest = Request & {
  user: { userId: string; email: string };
};

@Throttle({ default: { limit: 5, ttl: 60 } })
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll(
    @Req() req: AuthRequest,
    @Query() query: GetTasksQueryDto,
  ): Promise<TasksListResponseDto> {
    return this.taskService.findAll(req.user.userId, query);
  }

  @Get(':id')
  findOne(@Req() req: AuthRequest, @Param('id') id: string): Promise<TaskDto> {
    return this.taskService.findOne(req.user.userId, id);
  }

  @Post()
  create(
    @Req() req: AuthRequest,
    @Body() dto: CreateTaskDto,
  ): Promise<TaskDto> {
    return this.taskService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    return this.taskService.delete(req.user.userId, id);
  }
}
