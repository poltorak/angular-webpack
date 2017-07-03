import { TestBed } from '@angular/core/testing';
import { ApiEndpointsService } from './api-endpoints.service';

describe('Api Endpoint Service', () => {
  const apiEndpoints = new ApiEndpointsService();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiEndpointsService,
      ]
    });
  });

  it('should initialize', () => {
    expect(typeof apiEndpoints['_base']).toBe('string');
  });

  describe('#replaceParams', () => {
    let url = '';
    beforeEach(() => {
      url = `${apiEndpoints['_base']}/:param1/:param2`;
    });

    it('do not replace params when no options given', () => {
      expect(apiEndpoints.replaceParams(url)).toBe(url);
    });

    it('replaces one parameter when only one is specified', () => {
      expect(apiEndpoints.replaceParams(url, {param1: 'param1'})).toBe(`${apiEndpoints['_base']}/param1/:param2`);
    });

    it('replaces all specified parameters', () => {
      expect(apiEndpoints.replaceParams(url, { param1: 'param1', param2: 'param2' })).toBe(`${apiEndpoints['_base']}/param1/param2`);
    });

    it('do not replace paramter when parameter not found in options', () => {
      expect(apiEndpoints.replaceParams(url, {foo: 'param1'})).toBe(`${apiEndpoints['_base']}/:param1/:param2`);
    });
  });

  describe('#getUrl', () => {
    it('return url with already replaced params', () => {
      expect(apiEndpoints.getUrl('helloName', { name: 1 })).toEqual(`${apiEndpoints['_base']}/hello/1`);
    });

    it('throws an error when url not found', () => {
      const url = 'this/not/exists';
      expect(apiEndpoints.getUrl.bind(apiEndpoints, url, { param: 'foo' })).toThrowError(Error);
    });
  });
});
