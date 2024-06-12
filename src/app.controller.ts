import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UUID } from 'crypto';
import { AppService } from 'src/app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async getQuestionIdList() {
    return await this.appService.getQuestionIdList();
  }

  @Get('question/:questionId')
  async getTestSet(@Param('questionId', ParseUUIDPipe) questionId: UUID) {
    return this.appService.getTestSet(questionId);
  }
}
