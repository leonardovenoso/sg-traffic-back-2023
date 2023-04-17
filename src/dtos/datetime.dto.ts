import { IsStringAFormattedDate } from "../validators/isStringAFormattedDate";

export class DatetimeDTO {
  @IsStringAFormattedDate('')
  public datetime: string;
}