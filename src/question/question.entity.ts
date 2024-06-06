import { Entity, Column, OneToMany } from 'typeorm';
import { Answer } from 'src/answer/answer.entity';
import { QUESTION_TYPE } from 'src/constants/mbti.constant';
import { ExtendedBaseTimeEntity } from '@exnest/extended-nest';

@Entity('question')
export class Question extends ExtendedBaseTimeEntity {
  @Column({
    type: 'varchar',
    length: 512,
    unique: true,
  })
  contents: string;

  @Column({
    type: 'varchar',
    length: 32,
  })
  questionType: QUESTION_TYPE;

  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActivate: boolean;

  @OneToMany(() => Answer, (answer: Answer) => answer.question, {
    nullable: true,
  })
  answer?: Answer[];
}
