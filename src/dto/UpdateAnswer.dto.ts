import { CreateAnswerDto } from 'src/dto/CreateAnswer.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto){}