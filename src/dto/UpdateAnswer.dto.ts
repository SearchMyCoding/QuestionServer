import { CreateAnswerDto } from './CreateAnswer.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto){}