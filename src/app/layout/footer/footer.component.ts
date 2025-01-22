import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
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

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(library: FaIconLibrary) {
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
}
