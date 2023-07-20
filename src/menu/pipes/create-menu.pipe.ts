import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateMenuPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('menu.pipe.ts', metatype);
    return value;
  }
}
