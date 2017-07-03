import { OpaqueToken } from '@angular/core';

import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';

export const TRANSLATIONS = new OpaqueToken('translations');

const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS
};

export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary }
];

export const SUPPORTED_LANGUAGES = [ 'en' ];
