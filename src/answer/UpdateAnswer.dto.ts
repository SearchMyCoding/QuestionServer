import { CreateAnswerRequestDto } from 'src/answer/CreateAnswer.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAnswerRequestDto extends PartialType(CreateAnswerRequestDto) {}
