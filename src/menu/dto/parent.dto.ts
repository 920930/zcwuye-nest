import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'parentDto', async: false })
export class ParentDto implements ValidatorConstraintInterface {
  validate(data: null | number, args: ValidationArguments) {
    return data === null || typeof data === 'number';
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '($value)只能是数组或者为空';
  }
}
