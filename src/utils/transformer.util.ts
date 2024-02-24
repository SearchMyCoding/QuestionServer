import { LocalDateTime } from "@js-joda/core";
import { ValueTransformer } from "typeorm";
import { DateTimeUtil } from 'src/utils'

/// https://jojoldu.tistory.com/600
export default class LocalDateTimeTransformer implements ValueTransformer {
  // entity -> db로 넣을때
  to(entityValue: LocalDateTime): Date {
    return DateTimeUtil.toDate(entityValue);
  }

  // db -> entity로 가져올때
  from(databaseValue: Date): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(databaseValue);
  }
}