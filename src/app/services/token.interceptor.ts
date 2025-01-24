import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    // Clona la richiesta e aggiunge il token nell'header, se presente
    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Controlla se l'errore è 401 (non autorizzato)
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              // Aggiorna il token e ritenta la richiesta originale
              const newAccessToken = response.accessToken;
              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next.handle(clonedReq);
            }),
            catchError((refreshError) => {
              // Se il refresh fallisce, esegui il logout
              this.authService.logout();
              return throwError(refreshError);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
