import { Entity, Column, OneToMany, PrimaryGeneratedColumn, Timestamp, PrimaryColumn } from "typeorm";
import { Answer } from "./answer.entity";

@Entity('question')
export class Question{
    // @PrimaryGeneratedColumn("uuid")
    // id : number;

    @PrimaryColumn('uuid')
    id: number;

    @Column({generated : true, type: "int4"})
    sequence: number;

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
    isActivate : boolean;

    @OneToMany((type) => Answer, (answer : Answer) => answer.question)
    answer : Answer[]
}