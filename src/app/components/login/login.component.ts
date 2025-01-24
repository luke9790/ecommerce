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
  isLoading = false; // Per gestire lo stato di caricamento

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = ''; // Resetta i messaggi di errore
    this.isLoading = true; // Imposta lo stato di caricamento

    // Chiama il servizio di autenticazione
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        // Se il login ha successo, reindirizza
        alert('Login effettuato con successo!');
        this.isLoading = false;
        this.router.navigate(['/']); // Reindirizza alla home o alla pagina desiderata
      },
      error: (err) => {
        // Gestisci errori di login
        console.error(err);

        // Usa il messaggio di errore restituito dall'API, se disponibile
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Email o password non validi. Riprova.';
        }

        this.isLoading = false; // Ferma lo stato di caricamento
      },
    });
  }
}
