import { Entity, Column, ManyToOne, Timestamp, PrimaryColumn } from "typeorm";
import { Question } from "src/entities/question.entity";
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/type';

@Entity('answer')
export class Answer{
    @PrimaryColumn("uuid")
    id : number;

    @ManyToOne("question", (question : Question) => question.id, {
        cascade: true,
        createForeignKeyConstraints: true,
        nullable: false,
    })
    questionId : number;

    @Column({
        type: "timestamp",
        nullable: false
    })
    createAt : Timestamp;

    @Column({
        type: "timestamp",
        nullable: false
    })
    updateAt : Timestamp;

    @Column({
        type: "timestamp",
        nullable: true
    })
    deleteAt : Timestamp;

    @Column({
        type : "varchar",
        length : 50
    })
    answerType : MBTI_SINGLE_TEMPLATE_TYPE;

    @Column({
        type : "varchar",
        length : 500,
        unique: true
    })
    contents : string
}