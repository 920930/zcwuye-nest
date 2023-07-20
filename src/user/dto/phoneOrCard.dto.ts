import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'PhoneOrCardDto', async: false })
export class PhoneOrCardDto implements ValidatorConstraintInterface {
  validate(data: string, args: ValidationArguments) {
    return args.property.includes('phone') ? /^1[3-9]\d{9}$/.test(data) : /^\d{17}[0-9|x|y]$/i.test(data);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return args.property.includes('phone') ? '[$value]不是正确的手机号' : '[$value]不是正确的身份证号';
  }
}
