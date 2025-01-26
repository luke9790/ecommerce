import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';  // Importa Subscription per gestire la sottoscrizione

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
  isAuthenticated = false;  // Variabile per monitorare lo stato di autenticazione
  private authSubscription: Subscription | null = null; ;  // Variabile per la sottoscrizione

  constructor(
    private translate: TranslateService,
    private authService: AuthService,  // Iniettiamo il servizio Auth
    library: FaIconLibrary
  ) {
    library.addIcons(faShoppingCart, faHeart);
  }

  ngOnInit(): void {
    // Sottoscriviamo a isAuthenticated$ per monitorare lo stato di autenticazione
    this.authSubscription = this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    const browserLang = this.translate.getBrowserLang();
    const matchedLang = this.languages.find((lang) => lang.code === browserLang);
    this.selectedLanguage = matchedLang || this.languages[0];
    this.translate.use(this.selectedLanguage.code);
  }

  ngOnDestroy(): void {
    // Disiscrizione dalla sottoscrizione quando il componente viene distrutto
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
    }
  }

  // Metodo per il logout
  logout(): void {
    this.authService.logout();  // Chiamata al servizio di logout
  }
}
