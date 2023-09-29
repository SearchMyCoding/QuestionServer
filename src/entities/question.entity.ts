import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity('question')
export class Question{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        type : "varchar",
        length : 500,
        unique: true
    })
    contents : string;

    @Column({
        type : "varchar",
        length : 20,
    })
    questionType : string;

    @Column({
        type : "boolean",
        default : true
    })
    activate : boolean;

    @OneToMany((type) => Answer, (answer : Answer) => answer.question)
    answer : Answer[]
}