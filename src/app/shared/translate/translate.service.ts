import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from './translations';
import { get as findByPath } from 'lodash';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class I18nService {
  private _defaultLanguage = SUPPORTED_LANGUAGES[0];
  private _currentLanguage: string;
  private _supportedLanguages: any[] = SUPPORTED_LANGUAGES;
  private PLACEHOLDER = '%';
  public onLanguageChanged: Subject<string> = new Subject<string>();

  public get currentLanguage() {
    return this._currentLanguage || this._defaultLanguage;
  }

  public get supportedLanguages() {
    return this._supportedLanguages;
  }

  constructor(@Inject(TRANSLATIONS) private _translations: any) {
  }

  private translate(key: string): string {
    let currentLangTranslations = this._translations[this.currentLanguage];
    if (currentLangTranslations && findByPath(currentLangTranslations, key)) {
      return findByPath(currentLangTranslations, key).toString();
    }
    return key;
  }

  private getLanguageWithFallback(lang: string): string {
    return SUPPORTED_LANGUAGES.includes(lang) ? lang : this._defaultLanguage;
  }

  public use(lang: string): void {
    this._currentLanguage = this.getLanguageWithFallback(lang);
    this.onLanguageChanged.next(lang);
  }

  public instant(key: string, words?: string|number|number[]|string[]) {
    const translation: string = this.translate(key);
    if (!words) {
      return translation;
    }
    return this.replace(translation, words);
  }

  public replace(word, words: string|number|number[]|string[] = '') {
    let translation: string = word;
    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
    });

    return translation;
  }

  public returnTranslationsTree(path: string): Object {
    let currentLangTranslations = this._translations[this.currentLanguage];
    if (currentLangTranslations && findByPath(currentLangTranslations, path)) {
      return findByPath(currentLangTranslations, path);
    }
    return;
  }
}
