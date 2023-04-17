import { registerDecorator, ValidationOptions } from 'class-validator';
import * as moment from "moment";

export function IsStringAFormattedDate(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringAFormattedDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(datetime: any) {
          return  moment(datetime).isValid() && moment(datetime).year() >= 2016;
        },
      },
    });
  };
}