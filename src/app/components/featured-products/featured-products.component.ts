import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-featured-products',
  standalone: false,
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();

    this.translate.onLangChange.subscribe(() => {
      this.loadFeaturedProducts();
    });
  }

  loadFeaturedProducts() {
    const productsByLanguage = {
      en: [
        {
          name: 'Zapoj',
          description: 'Binge drinking; two or more days of continuous drunkenness.',
          price: 60.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Regular',
        },
        {
          name: 'Quaintrelle',
          description: "A stylish woman who lives in the name of passion and life's pleasures.",
          price: 77.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Oversize',
        },
        {
          name: 'Fernweh',
          description: 'A deep longing for far-off places and adventures.',
          price: 90.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Premium',
        },
        {
          name: 'Halcyon',
          description: 'A period of time in the past that was idyllically happy and peaceful.',
          price: 50.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Vintage',
        },
        {
          name: 'Ephemeral',
          description: 'Lasting for a very short time; fleeting.',
          price: 65.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Exclusive',
        },
        {
          name: 'Petrichor',
          description: 'The pleasant smell of rain on dry earth.',
          price: 55.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Classic',
        },
        {
          name: 'Wanderlust',
          description: 'A strong desire to travel and explore the world.',
          price: 80.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Adventure',
        },
        {
          name: 'Euphoria',
          description: 'A feeling of intense happiness and excitement.',
          price: 70.0,
          currency: 'USD',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Luxury',
        },
      ],
      it: [
        {
          name: 'Zapoj',
          description: 'Bere in eccesso per due o più giorni consecutivi.',
          price: 60.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Regolare',
        },
        {
          name: 'Quaintrelle',
          description: 'Una donna elegante che vive con passione e piaceri della vita.',
          price: 77.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Taglia grande',
        },
        {
          name: 'Fernweh',
          description: 'Un forte desiderio di luoghi lontani e avventure.',
          price: 90.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Premium',
        },
        {
          name: 'Halcyon',
          description: 'Un periodo di tempo del passato, idillicamente felice e sereno.',
          price: 50.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Vintage',
        },
        {
          name: 'Ephemeral',
          description: 'Che dura per un tempo molto breve; fugace.',
          price: 65.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Esclusivo',
        },
        {
          name: 'Petrichor',
          description: 'Il piacevole odore della pioggia sulla terra asciutta.',
          price: 55.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Classico',
        },
        {
          name: 'Wanderlust',
          description: 'Un forte desiderio di viaggiare ed esplorare il mondo.',
          price: 80.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Avventura',
        },
        {
          name: 'Euphoria',
          description: 'Una sensazione di intensa felicità ed entusiasmo.',
          price: 70.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Lusso',
        },
      ],
      es: [
        {
          name: 'Zapoj',
          description: 'Beber en exceso durante dos o más días consecutivos.',
          price: 60.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Regular',
        },
        {
          name: 'Quaintrelle',
          description: 'Una mujer elegante que vive con pasión y placeres de la vida.',
          price: 77.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Talla grande',
        },
        {
          name: 'Fernweh',
          description: 'Un profundo anhelo de lugares lejanos y aventuras.',
          price: 90.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Premium',
        },
        {
          name: 'Halcyon',
          description: 'Un periodo de tiempo en el pasado, idílicamente feliz y pacífico.',
          price: 50.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Vintage',
        },
        {
          name: 'Ephemeral',
          description: 'Que dura muy poco tiempo; fugaz.',
          price: 65.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Exclusivo',
        },
        {
          name: 'Petrichor',
          description: 'El agradable olor de la lluvia sobre la tierra seca.',
          price: 55.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Clásico',
        },
        {
          name: 'Wanderlust',
          description: 'Un fuerte deseo de viajar y explorar el mundo.',
          price: 80.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Aventura',
        },
        {
          name: 'Euphoria',
          description: 'Una sensación de intensa felicidad y entusiasmo.',
          price: 70.0,
          currency: 'EUR',
          imageSrc: 'https://via.placeholder.com/150',
          label: 'Lujo',
        },
      ],
    };
    
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    this.products = productsByLanguage[currentLang as keyof typeof productsByLanguage];
  }
}
