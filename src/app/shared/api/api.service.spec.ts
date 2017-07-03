import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ApiService } from './api.service';
import { ApiEndpointsService } from './api-endpoints.service';
import 'rxjs/Rx';

describe('Api Service', () => {
  let apiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ApiService, ApiEndpointsService,
        {
          provide: Http, useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
    apiService = TestBed.get(ApiService);
    apiService._base = 'http://example.com';
  });

  it('should initialize', () => {
    expect(typeof apiService._base).toBe('string');
  });

  describe('#parseData', () => {
    it('parses data from API', () => {
      let response: Response = new Response(new ResponseOptions({
        body: {
          data: { foo: 'bar' }
        }
      }));
      expect(apiService.parseData(response).data).toEqual({foo: 'bar'});
    });
  });

  describe('#updateAttributesTemplate', () => {
    it('returns a Promise',
      async(inject([ApiService, MockBackend], (api, backend) => {
        backend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({data: { name: 'John' }})
          })));
        });

        let promise = apiService.sayHello('John');
        expect(promise instanceof Promise).toBeTruthy();
        promise.then((data) => {
          expect(data).toBeTruthy();
          expect(data.data.name).toEqual('John');
        });
      })
    ));
  });
});
