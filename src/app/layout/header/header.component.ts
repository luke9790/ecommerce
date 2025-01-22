import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  languages = [
    { code: 'en', title: 'English', class: 'fi-us' },
    { code: 'it', title: 'Italiano', class: 'fi-it' },
    { code: 'es', title: 'Espanol', class: 'fi-es' },
  ];
  selectedLanguage = this.languages[0];
  isDropdownOpen = false;

  constructor(
    private translate: TranslateService,
    library: FaIconLibrary
  ) {
    library.addIcons(faShoppingCart, faHeart);
  
    const browserLang = this.translate.getBrowserLang();
    const matchedLang = this.languages.find((lang) => lang.code === browserLang);
    
    this.selectedLanguage = matchedLang || this.languages[0];
    this.translate.use(this.selectedLanguage.code);
  }
  

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  changeLanguage(lang: any): void {
    console.log(lang);
    if (lang.code !== this.selectedLanguage.code) {
      console.log("cambio lingua: ", this.selectedLanguage)
      this.selectedLanguage = lang;
      this.isDropdownOpen = false;
      this.translate.use(lang.code);
    }
  }
}
