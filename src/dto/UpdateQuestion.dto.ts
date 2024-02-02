import { CreateQuestionDto } from 'src/dto/CreateQuestion.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto){}