import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ShippingAddress } from '../../interfaces/interfaces';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  orders: any[] = [];
  shippingAddresses: ShippingAddress[] = [];

  editFirstName = '';
  editLastName = '';
  editEmail = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  activeTab: string = 'profile';
  showAddressForm: boolean = false;

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
      error: () => {
        this.errorMessage = 'Errore nel recupero dei dati. Riprova più tardi.';
      },
    });
  }

  getUserOrders(): void {
    this.userService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: () => {
        this.orders = [];
      },
    });
  }

  getUserAddresses(): void {
    this.userService.getUserAddresses().subscribe({
      next: (addresses) => {
        this.shippingAddresses = addresses;
      },
      error: () => {
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

  addNewAddress(address: ShippingAddress): void {
    this.userService.addShippingAddress(address).subscribe({
      next: (res) => {
        this.shippingAddresses.push(res.shippingAddress);
        this.successMessage = 'Indirizzo aggiunto con successo!';
        this.showAddressForm = false;
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Errore durante l\'aggiunta dell\'indirizzo. Riprova.';
      },
    });
  }

  removeAddress(addressId: number): void {
    this.userService.removeShippingAddress(addressId).subscribe({
      next: () => {
        this.shippingAddresses = this.shippingAddresses.filter(address => address.id !== addressId);
        this.successMessage = 'Indirizzo eliminato con successo!';
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Errore durante la rimozione dell\'indirizzo. Riprova.';
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
