import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsStringAFormattedDate(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStringAFormattedDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return !isNaN(Date.parse(value))
        },
      },
    });
  };
}