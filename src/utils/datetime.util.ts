import { LocalDateTime } from "@js-joda/core";

export class DateTimeUtil {
  /**
   * 
   * @param { LocalDateTime } localDateTime 
   * @returns { Date } UTC시간
   */
  static toDate(localDateTime: LocalDateTime): Date {
    const newDate: Date = new Date(localDateTime.toString());
    return newDate;
  }

  /**
   * 
   * @param { Date } date 
   * @returns { LocalDateTime } 현지 시간
   */
  static toLocalDateTime(date: Date): LocalDateTime {
    const localDate: Date = new Date(date);
    const hourOffset = localDate.getHours() - localDate.getUTCHours();
    localDate.setTime(date.getTime() + hourOffset * 60 * 60 * 1000);
    const localDateSrt: string = localDate.toISOString().replace(/Z/gi, ' ').trim();
    return LocalDateTime.parse(localDateSrt);
  }
}