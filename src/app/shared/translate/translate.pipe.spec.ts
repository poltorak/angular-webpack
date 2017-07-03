import { I18nPipe, I18nService } from '../translate';

describe('I18nPipe', () => {
  describe('#transform', () => {
    it('delegates translations to servie', () => {
      const service = new I18nService({en: { test: { name: 'test %0' }}});
      service.use('en');
      const pipe = new I18nPipe(service);
      expect(pipe.transform('test.name', '1')).toEqual('test 1');
    });

    it('delegates translations to service when theres no params', () => {
      const service = new I18nService({en: { test: { name: 'test' }}});
      service.use('en');
      const pipe = new I18nPipe(service);
      expect(pipe.transform('test.name')).toEqual('test');
    });
  });
});
