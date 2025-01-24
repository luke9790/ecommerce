import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  editFirstName = '';
  editLastName = '';
  editEmail = '';
  editPassword = '';
  editAddress = '';
  editCity = '';
  editState = '';
  editPostalCode = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data.user;
        this.editFirstName = this.user.first_name || '';
        this.editLastName = this.user.last_name || '';
        this.editEmail = this.user.email || '';
        this.editAddress = this.user.ShippingAddress?.address || '';
        this.editCity = this.user.ShippingAddress?.city || '';
        this.editState = this.user.ShippingAddress?.state || '';
        this.editPostalCode = this.user.ShippingAddress?.postal_code || '';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Errore nel recupero del profilo:', err);
        this.errorMessage = 'Errore nel recupero dei dati. Riprova più tardi.';
      },
    });
  }

  onUpdateProfile(): void {
    const updatedData = {
      first_name: this.editFirstName,
      last_name: this.editLastName,
      email: this.editEmail,
      password: this.editPassword,
      address: this.editAddress,
      city: this.editCity,
      state: this.editState,
      postal_code: this.editPostalCode,
    };

    this.userService.updateUserProfile(updatedData).subscribe({
      next: () => {
        this.successMessage = 'Profilo aggiornato con successo!';
        this.getUserProfile(); // Ricarica i dati aggiornati
        setTimeout(() => (this.successMessage = ''), 3000); // Rimuove il messaggio di successo dopo 3 secondi
      },
      error: (err) => {
        console.error('Errore nell\'aggiornamento del profilo:', err);
        this.errorMessage = err.error?.message || 'Errore durante l\'aggiornamento. Riprova.';
      },
    });
  }

  onLogout(): void {
    this.authService.logout(); // Rimuove i token e reimposta lo stato
    this.router.navigate(['/login']); // Reindirizza alla pagina di login
  }
}
