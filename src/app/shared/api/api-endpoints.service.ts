import { Injectable } from '@angular/core';

@Injectable()
export class ApiEndpointsService {
  /*
    Development: process.env.ENV !== 'build'
    Production: process.env.ENV === 'build'
  */
  private _base = 'http://example.com/v1';

  /*
    NOTICE: URLs are sorted alphabetically
  */
  private urls = {
    hello: '/hello',
    helloName: '/hello/:name'
  };

  replaceParams(url: string, options: Object = {}): string {
    let regex = new RegExp(/:\w+/g);
    let matches = url.match(regex);
    if (!matches) {
      return url;
    }
    for (let match of matches) {
      if (options.hasOwnProperty(match.substr(1))) {
        url = url.replace(match, options[match.substr(1)]);
      }
    }
    return url;
  }

  constructor() { }

  getUrl(key, params = {}): string {
    if (!this.urls[key]) {
      throw new Error(`Specified key (${key}) does not exists.`);
    }
    return this.replaceParams(`${this._base}${this.urls[key]}`, params);
  }
}
