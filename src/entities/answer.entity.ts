import { Entity, Column, ManyToOne, Timestamp, PrimaryColumn, Generated } from "typeorm";
import { Question } from "src/entities/question.entity";
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/type';

@Entity('answer')
export class Answer{
    @PrimaryColumn("uuid")
    id : number;

    @Column({
        generated : 'increment',
        type: "int4"
    })
    @Generated('increment')
    sequence: number;

    @Column({
        type: "timestamptz",
        nullable: false
    })
    createdAt : Date;

    @Column({
        type: "timestamptz",
        nullable: false
    })
    updatedAt : Date;

    @Column({
        type: "timestamptz",
        nullable: true
    })
    deletedAt : Date;

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
    contents : string;

    @ManyToOne("Question", "answers", {
        cascade: true,
        createForeignKeyConstraints: true,
        nullable: false,
    })
    question : Question;
}