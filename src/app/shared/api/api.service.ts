import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiEndpointsService } from './api-endpoints.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  title = 'Angular 2';

  constructor(private _http: Http, private _endpoints: ApiEndpointsService) {}

  private parseData(res: Response) {
    let body = res.json();
    return body || [];
  }

  private errorHandler(error: Response): Observable<any> {
    if (error.status === 401) {
      // logout
    }
    if (typeof error.json === 'function') {
      const errorMessage = error.json();
      return Observable.throw({ msg: errorMessage, status: error.status });
    }
    return Observable.throw(error);
  }

  private wrapRequest(httpRequest) {
    return httpRequest
      .map(this.parseData)
      .catch(this.errorHandler.bind(this))
      .toPromise();
  }

  sayHello(name): Promise<any> {
    return this.wrapRequest(
      this._http.get(this._endpoints.getUrl('helloName', { name }))
    );
  }
}
