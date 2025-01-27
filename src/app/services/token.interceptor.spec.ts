import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor = TestBed.inject(HTTP_INTERCEPTORS);
    expect(interceptor).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
