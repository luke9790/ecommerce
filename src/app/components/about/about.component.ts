import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  heroImage = 'assets/images/about/hero.jpg';
  storyImage = 'assets/images/about/story.jpg';
  qualityImage = 'assets/images/about/quality.jpg';

  whyUsIcons = [
    { icon: 'fas fa-shipping-fast', title: 'ABOUT.WHY_US.FAST_SHIPPING', text: 'ABOUT.WHY_US.FAST_SHIPPING_TEXT' },
    { icon: 'fas fa-star', title: 'ABOUT.WHY_US.QUALITY', text: 'ABOUT.WHY_US.QUALITY_TEXT' },
    { icon: 'fas fa-globe', title: 'ABOUT.WHY_US.WORLDWIDE', text: 'ABOUT.WHY_US.WORLDWIDE_TEXT' }
  ];
}
