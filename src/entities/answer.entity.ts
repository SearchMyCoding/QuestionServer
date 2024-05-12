import { Entity, Column, ManyToOne } from 'typeorm'
import { Question } from 'src/question/question.entity'
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/mbti.constant'
import { ExtendedBaseTimeEntity } from '@exnest/extended-nest'

@Entity('answer')
export class Answer extends ExtendedBaseTimeEntity {
  @ManyToOne(() => Question, (question) => question.answer, {
    cascade: true,
    createForeignKeyConstraints: true,
    nullable: false,
  })
  question?: Question

  @Column({
    type: 'varchar',
    length: 50,
  })
  answerType: MBTI_SINGLE_TEMPLATE_TYPE

  @Column({
    type: 'varchar',
    length: 512,
    unique: true,
  })
  contents: string
}
