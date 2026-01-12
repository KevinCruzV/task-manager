import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/authResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private user: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.user.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException();

    return this.signToken(user.id, user.email);
  }

  async register(email: string, password: string): Promise<AuthResponseDto> {
    const existing = await this.user.findByEmail(email);
    if (existing) throw new ConflictException('Email already used');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.user.create(email, hashed);

    return this.signToken(user.id, user.email);
  }

  private signToken(userId: string, email: string): AuthResponseDto {
    return {
      access_token: this.jwtService.sign({ sub: userId, email }),
    };
  }
}
