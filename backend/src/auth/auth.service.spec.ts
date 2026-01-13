import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

type UsersServiceMock = {
  findByEmail: jest.Mock;
  create: jest.Mock;
};

describe('Auth', () => {
  let service: AuthService;
  let usersService: UsersServiceMock;

  const jwtService = {
    sign: jest.fn().mockReturnValue('token'),
  };

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get(AuthService);

    jest.clearAllMocks();
  });

  it('fails login because of wrong password', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      password: await bcrypt.hash('good', 10),
    });

    await expect(service.login('test@test.com', 'bad')).rejects.toThrow();
  });

  it('log a user', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      password: await bcrypt.hash('good', 10),
    });

    const result = await service.login('test@test.com', 'good');

    expect(result.access_token).toBe('token');
  });

  it('registers a user', async () => {
    usersService.findByEmail.mockResolvedValue(null);
    usersService.create.mockResolvedValue({ id: '1', email: 'test@test.com' });

    const result = await service.register('test@test.com', 'password');

    expect(result.access_token).toBe('token');
  });

  it('throw if a user already exist', async () => {
    usersService.findByEmail.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      password: await bcrypt.hash('good', 10),
    });

    await expect(
      service.register('test@test.com', 'good'),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
