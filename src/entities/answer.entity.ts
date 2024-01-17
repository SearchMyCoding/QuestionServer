import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Question } from "./question.entity";

@Entity('answer')
export class Answer{
    @PrimaryGeneratedColumn("uuid")
    id : number;

    @ManyToOne((type) => Question, (question : Question) => question.id)
    question : number;

    @Column({
        type: "timestamp",
        nullable: false,
        default: ()=>'CURRENT_TIMESTAMP'
    })
    createAt : Timestamp;

    @Column({
        type: "timestamp",
        nullable: true
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
    answerType : string;

    @Column({
        type : "varchar",
        length : 500,
        unique: true
    })
    contents : string
}