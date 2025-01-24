import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Controlla che le password combacino
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Le password non combaciano.';
      return;
    }

    // Chiama il servizio di registrazione
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registrazione completata! Puoi effettuare il login.';
        alert(this.successMessage);
        setTimeout(() => {
          this.router.navigate(['/login']); // Reindirizza dopo un breve intervallo
        }, 2000);
      },
      error: (err) => {
        console.error(err);

        // Usa il messaggio di errore restituito dall'API, se disponibile
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Errore durante la registrazione. Riprova più tardi.';
        }
      },
    });
  }
}
