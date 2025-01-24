import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api'; // Base URL dell'API
  private isAuthenticated = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }  

  // Effettua il login e salva i token
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveTokens(response.accessToken, response.refreshToken); // Salva i token
        this.isAuthenticated.next(true); // Aggiorna lo stato di autenticazione
      })
    );
  }
  
  // Effettua il logout e rimuove i token
  logout(): void {
    this.clearTokens();
    this.isAuthenticated.next(false);
  }

  // Rinnova l'access token usando il refresh token
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response: any) => {
        this.saveTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  // Restituisce l'access token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Restituisce il refresh token
  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Salva i token
  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Rimuove i token
  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Controlla se un token è scaduto
  private isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica il payload
    const currentTime = Math.floor(Date.now() / 1000); // Tempo attuale in secondi
    return payload.exp < currentTime;
  }

  // Controlla se l'utente è loggato
  public isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.isTokenExpired(token);
  }
}
