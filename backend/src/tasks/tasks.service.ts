import { Prisma } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksQueryDto } from './dto/get-tasks.query.dto';
import { TasksListResponseDto } from './dto/get-tasks.query.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId,
      },
    });
  }

  async findOne(userId: string, id: string): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async update(userId: string, id: string, dto: UpdateTaskDto): Promise<Task> {
    const res = await this.prisma.task.updateMany({
      where: { id, userId },
      data: dto,
    });

    if (res.count === 0) throw new NotFoundException('Task not found');

    return this.findOne(userId, id);
  }

  async delete(userId: string, id: string): Promise<{ deleted: boolean }> {
    const res = await this.prisma.task.deleteMany({
      where: { id, userId },
    });

    if (res.count === 0) {
      throw new NotFoundException('Task not found');
    }
    return { deleted: true };
  }

  async findAll(
    userId: string,
    query: GetTasksQueryDto,
  ): Promise<TasksListResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const q = query.q?.trim();
    const where: Prisma.TaskWhereInput = {
      userId,
      ...(typeof query.completed === 'boolean'
        ? { completed: query.completed }
        : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const orderBy: Prisma.TaskOrderByWithRelationInput = {
      [query.sortBy ?? 'createdAt']: query.order ?? 'desc',
    };

    const [total, items] = await this.prisma.$transaction([
      this.prisma.task.count({ where }),
      this.prisma.task.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}
