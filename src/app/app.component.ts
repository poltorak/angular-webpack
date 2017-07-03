import { Component, OnInit, OnDestroy } from '@angular/core';
import { I18nService } from './shared';


import '../style/app.scss';

@Component({
  selector: 'my-project-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  url = 'https://github.com/preboot/angular2-webpack';
  supportedLangs: any[];
  translatedText: string;

  constructor(private _translate: I18nService) {
  }

  ngOnInit() {
    this.supportedLangs = this._translate.supportedLanguages;
    this.subscribeLanguageChange();
    this.selectLanguage('en');
  }

  ngOnDestroy() {
    this._translate.onLanguageChanged.unsubscribe();
  }

  isCurrentLanguage(lang: string) {
    return lang === this._translate.currentLanguage;
  }

  selectLanguage(lang: string) {
    this._translate.use(lang);
  }

  refreshText() {
    this.translatedText = this._translate.instant('hello');
  }

  subscribeLanguageChange() {
    this._translate.onLanguageChanged.subscribe(() => this.refreshText());
  }
}
