import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'luxonDateMedium'
})
export class LuxonDateMediumPipe implements PipeTransform {

  transform(value: any): string | null {
    if (value instanceof DateTime) {
      return value.toFormat("EEE d.M. H:mm");
    } else {
      return null;
    }
  }

}
