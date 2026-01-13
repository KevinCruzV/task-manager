import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const prismaMock = {
    task: {
      create: jest.fn(),
      findFirst: jest.fn(),
      updateMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = moduleRef.get(TasksService);
  });

  it('create -> should create a task with userId', async () => {
    prismaMock.task.create.mockResolvedValue({
      id: 't1',
      title: 'Hello',
      description: null,
      completed: false,
      userId: 'u1',
      createdAt: new Date(),
      updateAt: new Date(),
    });

    const res = await service.create('u1', { title: 'Hello' });

    expect(prismaMock.task.create).toHaveBeenCalledWith({
      data: { title: 'Hello', description: undefined, userId: 'u1' },
    });
    expect(res.userId).toBe('u1');
  });

  it('findOne -> returns task when owned', async () => {
    prismaMock.task.findFirst.mockResolvedValue({
      id: 't1',
      title: 'A',
      description: null,
      completed: false,
      userId: 'u1',
      createdAt: new Date(),
      updateAt: new Date(),
    });

    const res = await service.findOne('u1', 't1');

    expect(prismaMock.task.findFirst).toHaveBeenCalledWith({
      where: { id: 't1', userId: 'u1' },
    });
    expect(res.id).toBe('t1');
  });

  it('findOne -> throws NotFound when task not owned (cross-user blocked)', async () => {
    prismaMock.task.findFirst.mockResolvedValue(null);

    await expect(service.findOne('u2', 't1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('update -> updates when owned', async () => {
    prismaMock.task.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.task.findFirst.mockResolvedValue({
      id: 't1',
      title: 'New',
      description: null,
      completed: true,
      userId: 'u1',
      createdAt: new Date(),
      updateAt: new Date(),
    });

    const res = await service.update('u1', 't1', {
      title: 'New',
      completed: true,
    });

    expect(prismaMock.task.updateMany).toHaveBeenCalledWith({
      where: { id: 't1', userId: 'u1' },
      data: { title: 'New', completed: true },
    });
    expect(res.title).toBe('New');
  });

  it('update -> throws NotFound when not owned', async () => {
    prismaMock.task.updateMany.mockResolvedValue({ count: 0 });

    await expect(
      service.update('u2', 't1', { title: 'X' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('delete -> deletes when owned', async () => {
    prismaMock.task.deleteMany.mockResolvedValue({ count: 1 });

    const res = await service.delete('u1', 't1');

    expect(prismaMock.task.deleteMany).toHaveBeenCalledWith({
      where: { id: 't1', userId: 'u1' },
    });
    expect(res).toEqual({ deleted: true });
  });

  it('delete -> throws NotFound when not owned', async () => {
    prismaMock.task.deleteMany.mockResolvedValue({ count: 0 });

    await expect(service.delete('u2', 't1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
