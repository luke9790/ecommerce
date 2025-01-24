import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Puoi rimuovere se non usi CSS
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    // Chiama il servizio di autenticazione
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        // Se il login ha successo, salva il token e reindirizza
        alert('Login effettuato con successo!');
        this.router.navigate(['/']); // Reindirizza alla home o alla pagina desiderata
      },
      error: (err) => {
        // Gestisci errori di login
        console.error(err);
        this.errorMessage = 'Email o password non validi. Riprova.';
      },
    });
  }
}
