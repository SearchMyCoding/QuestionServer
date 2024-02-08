import { Entity, Column, OneToMany, PrimaryColumn, Generated } from "typeorm";
import { Answer } from "src/entities/answer.entity";
import { UUID } from "crypto";
import { LocalDateTimeTransformer } from "src/utils/transformer.util";
import { LocalDateTime } from "@js-joda/core";
import { QUESTION_TYPE } from "src/constants/mbti.constant";

@Entity('question')
export class Question{
  @PrimaryColumn('uuid')
  id: UUID;

  @Column({
    generated : 'increment',
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
    default: null,
    transformer: new LocalDateTimeTransformer()
  })
  deletedAt: LocalDateTime;

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
      cascade: true,
      nullable: false
    }
  )
  answers: Answer[];
}