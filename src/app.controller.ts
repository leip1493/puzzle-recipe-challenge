import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
@Controller('/')
export class AppController {
  @Get()
  toPlayground(@Res() res: Response) {
    return res.redirect('graphql');
  }
}
