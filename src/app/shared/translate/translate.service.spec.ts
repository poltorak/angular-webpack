import { I18nService } from '../translate';

describe('I18nService', () => {
  const createService = function(translations: any) {
    let service = new I18nService({ en: translations });
    service.use('en');
    return service;
  };

  beforeEach(() => {
    this.service = createService({key: 'value', nested: { foo: 'bar' }});
  });

  describe('#currentLanguage', () => {
    it('returns language code', () => {
      expect(this.service.currentLanguage).toEqual('en');
    });
  });

  describe('#supportedLanguages', () => {
    it('returns array of supported languages', () => {
      expect(this.service.supportedLanguages instanceof Array).toBe(true);
    });
  });

  describe('#use', () => {
    it('has use method that changes language', () => {
      expect(typeof this.service.use).toEqual('function');
      expect(this.service.currentLanguage).toEqual('en');
    });

    it('fallbacks to en lang when user specifies unsupported language', () => {
      this.service.use('pl');
      expect(this.service.currentLanguage).toEqual('en');
    });
  });

  describe('#replace', () => {
    it('replaces "%[num]" in proper order with particular value', () => {
      let word = 'test %0 %1';
      let words = ['first', 'second'];
      expect(this.service.replace(word, words)).toEqual('test first second');
    });

    it('replaces "%[num]" and leaves "%[num]" when not enough params are specified', () => {
      let word = 'test %0 %1';
      let words = ['first'];
      expect(this.service.replace(word, words)).toEqual('test first %1');
    });

    it('does not replace anything when params are not specified', () => {
      let word = 'test %0 %1';
      let words = [];
      expect(this.service.replace(word, words)).toEqual('test %0 %1');
    });

    it('replaces in order that starts from 0', () => {
      let word = 'test %1';
      let words = ['first', 'second'];
      expect(this.service.replace(word, words)).toEqual('test second');
    });
  });

  describe('#instant', () => {
    it('translates text with params', () => {
      let service = createService({ key: 'value %0'});
      expect(service.instant('key', 'hello')).toEqual('value hello');
    });

    it('translates nested key text with params', () => {
      let service = createService({ key: { foo: { bar: 'value %0'}}});
      expect(service.instant('key.foo.bar', 'hello')).toEqual('value hello');
    });

    it('translates text without params', () => {
      let service = createService({ key: 'value'});
      expect(service.instant('key')).toEqual('value');
    });
  });

  describe('#returnTranslationsTree', () => {
    it('return object instead of translation', () => {
      expect(this.service.returnTranslationsTree('nested')).toEqual({ foo: 'bar' });
    });

    it('returns undefined when path not found', () => {
      expect(this.service.returnTranslationsTree('nested_that_doesnt_exists')).toBeUndefined();
    });
  });
});
