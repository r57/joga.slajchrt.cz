import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

import { dateFormatMedium } from '../utils';

@Pipe({
  name: 'luxonDateMedium'
})
export class LuxonDateMediumPipe implements PipeTransform {

  transform(value: any): string | null {
    if (value instanceof DateTime) {
      return dateFormatMedium(value);
    } else {
      return null;
    }
  }

}
