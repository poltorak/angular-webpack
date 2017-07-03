import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../translate';

@Pipe({
  name: 'i18n',
  pure: false
})

export class I18nPipe implements PipeTransform {
  constructor(private _translate: I18nService) { }

  transform(value: string, ...args: string[]): any {
    if (!value) {
      return;
    }
    return this._translate.instant(value, args);
  }
};
