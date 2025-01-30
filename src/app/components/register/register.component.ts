import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
  successMessage = '';
  errorMessage = '';

  errorEmail = '';
  errorPassword = '';
  errorConfirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onRegister(): void {
    this.errorMessage = '';
    this.errorEmail = '';
    this.errorPassword = '';
    this.errorConfirmPassword = '';

    if (!this.email) {
      this.errorEmail = this.translate.instant('REGISTER.ERROR.EMAIL_REQUIRED');
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errorEmail = this.translate.instant('REGISTER.ERROR.EMAIL_INVALID');
    }
    if (!this.password) {
      this.errorPassword = this.translate.instant('REGISTER.ERROR.PASSWORD_REQUIRED');
    } else if (this.password.length < 6) {
      this.errorPassword = this.translate.instant('REGISTER.ERROR.PASSWORD_MIN_LENGTH');
    }
    if (!this.confirmPassword) {
      this.errorConfirmPassword = this.translate.instant('REGISTER.ERROR.CONFIRM_PASSWORD_REQUIRED');
    } else if (this.password !== this.confirmPassword) {
      this.errorConfirmPassword = this.translate.instant('REGISTER.ERROR.PASSWORD_MISMATCH');
    }
    if (this.errorEmail || this.errorPassword || this.errorConfirmPassword) {
      return;
    }
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.successMessage = this.translate.instant('REGISTER.SUCCESS');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = this.translate.instant('REGISTER.ERROR.GENERAL');
      },
    });
  }
}
