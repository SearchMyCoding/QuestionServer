import { Entity, Column, ManyToOne, Timestamp, PrimaryColumn, Generated } from "typeorm";
import { Question } from "src/entities/question.entity";
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/mbti';
import { UUID } from "crypto";
import { LocalDateTime } from "@js-joda/core";
import { LocalDateTimeTransformer } from "src/utils/transformer.util";

@Entity('answer')
export class Answer{
  @PrimaryColumn("uuid")
  id: UUID;

  @Column({
    generated: 'increment',
    type: "int"
  })
  @Generated('increment')
  sequence: number;

  @Column({
    type: "timestamptz",
    nullable: false,
    transformer: new LocalDateTimeTransformer()
  })
  createdAt: LocalDateTime;

  @Column({
    type: "timestamptz",
    nullable: false,
    transformer: new LocalDateTimeTransformer()
  })
  updatedAt: LocalDateTime;

  @Column({
    type: "timestamptz",
    nullable: true,
    transformer: new LocalDateTimeTransformer()
  })
  deletedAt: LocalDateTime;

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