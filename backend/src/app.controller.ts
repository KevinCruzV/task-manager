import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Throttle({ default: { limit: 5, ttl: 60 } })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
