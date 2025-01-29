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
  orders: any[] = [];
  shippingAddresses: any[] = [];

  editFirstName = '';
  editLastName = '';
  editEmail = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  activeTab: string = 'profile';

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
      },
      error: (err) => {
        console.error('Errore nel recupero del profilo:', err);
        this.errorMessage = 'Errore nel recupero dei dati. Riprova più tardi.';
      },
    });
  }

  getUserOrders(): void {
    this.userService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        console.error('Errore nel recupero degli ordini:', err);
        this.orders = [];
      },
    });
  }

  getUserAddresses(): void {
    this.userService.getUserAddresses().subscribe({
      next: (addresses) => {
        this.shippingAddresses = addresses;
      },
      error: (err) => {
        console.error('Errore nel recupero degli indirizzi:', err);
        this.shippingAddresses = [];
      },
    });
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'orders' && this.orders.length === 0) {
      this.getUserOrders();
    }
    if (tab === 'addresses' && this.shippingAddresses.length === 0) {
      this.getUserAddresses();
    }
  }

  onUpdateProfile(): void {
    const updatedData = {
      first_name: this.editFirstName,
      last_name: this.editLastName,
      email: this.editEmail,
    };
  
    this.userService.updateUserProfile(updatedData).subscribe({
      next: () => {
        this.successMessage = 'Profilo aggiornato con successo!';
        this.getUserProfile();
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => {
        console.error("Errore nell'aggiornamento del profilo:", err);
        this.errorMessage = err.error?.message || 'Errore durante l\'aggiornamento. Riprova.';
      },
    });
  }

  onChangePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Le password non corrispondono.';
      return;
    }

    const passwordData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    };

    this.userService.updateUserProfile(passwordData).subscribe({
      next: () => {
        this.successMessage = 'Password aggiornata con successo! Effettua di nuovo il login.';
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Errore nel cambio password. Riprova.';
      },
    });
  }


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
