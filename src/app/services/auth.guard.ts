import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Controlla se l'utente è autenticato
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Reindirizza alla pagina di login
      return false;
    }
    return true;
  }
}
