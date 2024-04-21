import { Entity, Column, ManyToOne } from "typeorm";
import { Question } from "src/entities/question.entity";
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/mbti.constant';
import { BaseTimeEntity } from "src/entities/base-time.entity";

@Entity('answer')
export class Answer extends BaseTimeEntity{
  @Column({
    type: "varchar",
    length : 50
  })
  answerType: MBTI_SINGLE_TEMPLATE_TYPE;

  @Column({
    type: "varchar",
    length : 512,
    unique: true
  })
  contents: string;

  @ManyToOne(
    "Question",
    "answers",
    {
      cascade: true,
      createForeignKeyConstraints: true,
      nullable: false,
    }
  )
  question: Question;
}