import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  languages = [
    { code: 'en', title: 'English', class: 'fi-us' },
    { code: 'it', title: 'Italiano', class: 'fi-it' },
    { code: 'es', title: 'Espanol', class: 'fi-es' },
  ];
  selectedLanguage = this.languages[0];
  isDropdownOpen = false;
  isAuthenticated = false; 
  private authSubscription: Subscription | null = null;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    library: FaIconLibrary
  ) {
    library.addIcons(faShoppingCart, faHeart);
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    const storedLang = localStorage.getItem('selectedLanguage');
    
    if (storedLang && this.languages.some(lang => lang.code === storedLang)) {
      this.selectedLanguage = this.languages.find(lang => lang.code === storedLang)!;
    } else {
      const browserLang = this.translate.getBrowserLang();
      const matchedLang = this.languages.find((lang) => lang.code === browserLang);
      this.selectedLanguage = matchedLang || this.languages[0];
    }

    this.translate.use(this.selectedLanguage.code);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeLanguage(lang: any): void {
    if (lang.code !== this.selectedLanguage.code) {
      this.selectedLanguage = lang;
      this.isDropdownOpen = false;
      this.translate.use(lang.code);
      
      localStorage.setItem('selectedLanguage', lang.code);
    }
  }

  logout(): void {
    this.authService.logout();
    
  }
}
