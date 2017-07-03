import { TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { TRANSLATION_PROVIDERS, ApiService, I18nService } from './shared';
import { AppComponent } from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [TRANSLATION_PROVIDERS, ApiService, I18nService, provideRoutes([])]
    });
  });

  it('should have an url', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.componentInstance.url).toEqual('https://github.com/preboot/angular2-webpack');
  });

});
