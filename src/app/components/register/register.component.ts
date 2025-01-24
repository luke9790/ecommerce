import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    // Controlla che le password combacino
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Le password non combaciano.';
      return;
    }

    // Chiama il servizio di registrazione
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        alert('Registrazione completata! Puoi effettuare il login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Errore durante la registrazione. Riprova più tardi.';
      }
    });
  }
}
