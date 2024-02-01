import { Entity, Column, OneToMany, Timestamp, PrimaryColumn, Generated } from "typeorm";
import { Answer } from "src/entities/answer.entity";

@Entity('question')
export class Question{
    @PrimaryColumn('uuid')
    id: number;

    @Column({
        generated : 'increment',
        type: "int4"
    })
    @Generated('increment')
    sequence: number;

    @Column({
        type: "timestamp",
        nullable: false
    })
    createdAt : Timestamp;

    @Column({
        type: "timestamp",
        nullable: false
    })
    updatedAt : Timestamp;

    @Column({
        type: "timestamp",
        nullable: true
    })
    deletedAt : Timestamp;

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

    @OneToMany(
        "Answer",
        "question"
    )
    answers : Answer[];
}