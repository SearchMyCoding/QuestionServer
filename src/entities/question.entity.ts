import { Entity, Column, OneToMany, PrimaryColumn, Generated } from "typeorm";
import { Answer } from "src/entities/answer.entity";
import { QUESTION_TYPE } from "src/constants/mbti.constant";
import { BaseTimeEntity } from "src/entities/base-time.entity";

@Entity('question')
export class Question extends BaseTimeEntity{
  @Column({
    type: "varchar",
    length: 512,
    unique: true
  })
  contents: string;

  @Column({
    type: "varchar",
    length: 32,
  })
  questionType: QUESTION_TYPE;

  @Column({
    type: "boolean",
    default: true,
    nullable: false
  })
  isActivate: boolean;

  @OneToMany(
    "Answer",
    "question",
    {
      nullable: true
    }
  )
  answers: Answer[];
}