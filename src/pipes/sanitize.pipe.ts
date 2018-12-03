
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { sanitizeAsync } from 'class-sanitizer';
import { pickBy } from 'lodash';

@Injectable()
export class SanitizePipe implements PipeTransform<any> {
  public async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    return await sanitizeAsync(value);
  }

  private toValidate(metatype: new (...args: ArgumentMetadata[]) => ArgumentMetadata): boolean {
    const types: (new (...args: ArgumentMetadata[]) => any)[] = [String, Boolean, Number, Array, Object];
    return !types.find((type: new (...args: ArgumentMetadata[]) => any) => metatype === type);
  }
}
