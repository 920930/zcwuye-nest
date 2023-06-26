import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorator/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(): string {
    return this.appService.getHello();
  }

  @Get('haha')
  getHello(): string {
    return 'haha';
  }
}
