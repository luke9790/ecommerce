import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TranslateService } from '@ngx-translate/core';
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faTwitter,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faCcStripe,
  faCcAmazonPay,
} from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  currentLanguage: string = 'en';
  private langChangeSubscription: Subscription = new Subscription();
  
  constructor(library: FaIconLibrary,
    private translate: TranslateService
  ) {
    library.addIcons(
      faInstagram,
      faFacebook,
      faTiktok,
      faTwitter,
      faCcVisa,
      faCcMastercard,
      faCcPaypal,
      faCcStripe,
      faCcAmazonPay
    );
  }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang || this.translate.defaultLang;

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.currentLanguage = this.translate.currentLang;
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
