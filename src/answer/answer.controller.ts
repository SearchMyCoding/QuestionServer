import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateAnswerDto } from 'src/dto/UpdateAnswer.dto';
import { Answer } from 'src/entities/answer.entity';
import { AnswerService } from 'src/answer/answer.service';
import { CreateAnswerDto } from 'src/dto/CreateAnswer.dto';
import { Post, Body, Get, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UUID } from 'crypto';
import { ExtendedController } from '@exnest/extended-nest';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

@ExtendedController({
  pathOptions: [
    {
      path: ['answers'],
    },
  ],
})
@ApiTags('답변 API')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('')
  @ApiOperation({
    summary: '답변 조회하는 요청',
    description: '답변 배열 형태로 반환한다.',
  })
  async getAnswers(): Promise<Answer[]> {
    return await this.answerService.read();
  }

  @Post('')
  @ApiOperation({
    summary: '답변을 생성하는 요청',
    description: 'body를 CreateAnswerDto에 맞춰 요청해야 생성된다.',
  })
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return await this.answerService.create(createAnswerDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'id를 이용한 답변 조회하는 요청',
    description: 'id를 이용하여 답변을 조회한다.',
  })
  @ApiQuery({
    name: 'answerId',
    required: false,
  })
  async getOneAnswer(@Param('id', ParseUUIDPipe) answerId: UUID): Promise<Answer> {
    const targetOption: FindManyOptions<Answer> = {
      where: {
        id: answerId,
      },
    };
    const [answer]: Answer[] = await this.answerService.read(targetOption);
    return answer;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'id를 이용하여 답변의 일부를 수정하는 요청',
    description: 'id가 존재하여야 하며 body를 UpdateAnswerDto에 맞춰 요청해야 변경된다.',
  })
  @ApiQuery({
    name: 'answerId',
    required: false,
  })
  async patchAnswer(@Param('id', ParseUUIDPipe) answerId: UUID, @Body() updateAnswerDto: UpdateAnswerDto) {
    const targetOption: FindOptionsWhere<Answer> = {
      id: answerId,
    };
    return await this.answerService.update(targetOption, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'id를 이용하여 답변을 삭제하는 요청',
    description: '먼저 softDelete된다. 이후 시간이 지나면 retention policy에 의하여 보관되다가 삭제된다.',
  })
  @ApiQuery({
    name: 'answerId',
    required: false,
  })
  async deleteAnswer(@Param('id', ParseUUIDPipe) answerId: UUID) {
    const targetOption: FindOptionsWhere<Answer> = {
      id: answerId,
    };
    return await this.answerService.softDelete(targetOption);
  }
}
