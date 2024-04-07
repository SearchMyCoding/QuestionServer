import { LocalDateTime } from "@js-joda/core";
import { UUID } from "crypto";
import { LocalDateTimeTransformer } from "src/utils";
import { Column, Generated, PrimaryColumn } from "typeorm";

export abstract class BaseTimeEntity{
  @PrimaryColumn("uuid")
  id: UUID;

  @Column({
    generated: 'increment',
    type: "int",
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
}