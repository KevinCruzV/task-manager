import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

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
}
