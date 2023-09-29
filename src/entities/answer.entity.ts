import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity('answer')
export class Answer{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne((type) => Question, (question : Question) => question.id)
    question : number;

    @Column({
        type : "varchar",
        length : 50
    })
    answerType : string;

    @Column({
        type : "varchar",
        length : 500,
        unique: true
    })
    contents : string
}