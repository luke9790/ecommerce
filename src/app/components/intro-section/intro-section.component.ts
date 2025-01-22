import { Component } from '@angular/core';

@Component({
  selector: 'app-intro-section',
  standalone: false,
  
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.scss'
})
export class IntroSectionComponent {

  leftImages = [
    { src: 'assets/images/intro-section/image1.jpg', alt: 'Model 1', span: 'col-span-2 row-span-1', position: 'center' },
    { src: 'assets/images/intro-section/image2.jpg', alt: 'Model 2', span: 'col-span-1 row-span-2', position: 'top' },
    { src: 'assets/images/intro-section/image3.jpg', alt: 'Model 3', span: 'col-span-1 row-span-1', position: 'center' }
  ];

  // Immagini a destra
  rightImages = [
    { src: 'assets/images/intro-section/image4.jpg', alt: 'Model 4', span: 'col-span-1 row-span-2', position: 'center' },
    { src: 'assets/images/intro-section/image5.jpg', alt: 'Model 5', span: 'col-span-2 row-span-1', position: 'bottom' },
    { src: 'assets/images/intro-section/image6.jpg', alt: 'Model 6', span: 'col-span-1 row-span-1', position: 'top' }
  ];
}
